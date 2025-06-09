import os
import zipfile
import shutil
import fitz  # PyMuPDF
from flask import Flask, request, render_template, url_for, send_file
from werkzeug.utils import secure_filename
from datetime import datetime

app = Flask(__name__)

UPLOAD_FOLDER = 'uploads'
TMP_FOLDER = 'tmp'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
os.makedirs(TMP_FOLDER, exist_ok=True)

# アップロードフォーム
@app.route('/')
def index():
    return render_template('index.html', message=None)

# アップロードされたPDFを処理
@app.route('/upload', methods=['POST'])
def upload():
    file = request.files.get('file')
    if not file or file.filename == '':
        return render_template('index.html', message='PDFファイルが選択されていません')

    filename = secure_filename(file.filename)
    input_path = os.path.join(UPLOAD_FOLDER, filename)
    file.save(input_path)

    # ZIPファイル名の生成
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    zip_filename = f"pdf_images_{timestamp}.zip"
    zip_path = os.path.join(UPLOAD_FOLDER, zip_filename)

    # 画像変換処理
    success = pdf2image(input_path=input_path, output_path=zip_path)
    # print(success)

    # 元PDFを削除
    if os.path.exists(input_path):
        os.remove(input_path)

    if success:
        download_url = url_for('download_file', filename=zip_filename)
        message = f'PDF画像変換完了：<a href="{download_url}" download>こちらからZIPを保存</a>'
    else:
        message = 'PDFに画像が含まれていないか、変換に失敗しました。'

    return render_template('index.html', message=message)

# ダウンロードと削除処理
@app.route('/download/<filename>')
def download_file(filename):
    filepath = os.path.join(UPLOAD_FOLDER, filename)
    if not os.path.exists(filepath):
        return "ファイルが存在しません", 404

    try:
        response = send_file(filepath, as_attachment=True)

        @response.call_on_close
        def remove_file():
            try:
                if os.path.exists(filepath):
                    os.remove(filepath)
                    print(f"[INFO] 削除完了: {filepath}")
            except Exception as e:
                print(f"[削除エラー] {filepath}: {e}")

        return response
    except Exception as e:
        return f"ダウンロード中にエラーが発生しました: {e}", 500

# 画像変換とZIP保存
def pdf2image(input_path, output_path):
    try:
        root_path = os.path.dirname(os.path.abspath(__file__))
        img_dir = os.path.join(root_path, TMP_FOLDER)
        os.makedirs(img_dir, exist_ok=True)

        doc = fitz.open(input_path)
        image_count = 0

        for page_index in range(len(doc)):
            page = doc[page_index]
            image_list = page.get_images(full=True)

            for img_index, img in enumerate(image_list):
                xref = img[0]
                base_image = doc.extract_image(xref)
                image_bytes = base_image["image"]
                image_ext = base_image["ext"]
                image_path = os.path.join(img_dir, f"page{page_index+1}_{img_index+1}.{image_ext}")

                with open(image_path, "wb") as img_file:
                    img_file.write(image_bytes)
                    image_count += 1
        # print(image_count) やっぱり 3あるな
        # 画像が1つもなければ終了
        if image_count == 0:
            shutil.rmtree(img_dir)
            return False

        with zipfile.ZipFile(output_path, 'w', zipfile.ZIP_DEFLATED) as zipf:
            for root, _, files in os.walk(img_dir):
                for file in files:
                    full_path = os.path.join(root, file)
                    arcname = os.path.relpath(full_path, start=img_dir)
                    zipf.write(full_path, arcname)
        
        # shutil.rmtree(img_dir)
        return True
    except Exception as e:
        print(f"[画像抽出エラー] {e}")
        return False


if __name__ == '__main__':
    app.run(debug=True, port=5000)