import os
import zipfile
import shutil
import fitz  # PyMuPDF
from flask import Flask, request, render_template, url_for, send_file, after_this_request
from werkzeug.utils import secure_filename
from datetime import datetime

app = Flask(__name__)

UPLOAD_FOLDER = 'uploads'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

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

    # ZIPファイルと画像保存フォルダの準備
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    base_name = f"pdf_images_{timestamp}"
    zip_filename = f"{base_name}.zip"
    zip_path = os.path.join(UPLOAD_FOLDER, zip_filename)
    image_folder = os.path.join(UPLOAD_FOLDER, base_name)

    # 画像変換処理
    success = pdf2image(input_path=input_path, output_path=zip_path, image_dir=image_folder)

    # 元PDFを削除
    if os.path.exists(input_path):
        os.remove(input_path)

    if success:
        download_url = url_for('download_file', filename=zip_filename)
        message = f'PDF画像変換完了：<a href="{download_url}" download>こちらからZIPを保存</a>'
    else:
        message = 'PDFに画像が含まれていないか、変換に失敗しました。'

    return render_template('index.html', message=message)

# ダウンロードと削除処理（ZIPと画像フォルダを両方削除）
@app.route('/download/<filename>')
def download_file(filename):
    filepath = os.path.join(UPLOAD_FOLDER, filename)
    folder_to_delete = os.path.join(UPLOAD_FOLDER, filename.replace(".zip", ""))

    if not os.path.exists(filepath):
        return "ファイルが存在しません", 404

    @after_this_request
    def remove_files(response):
        try:
            if os.path.exists(filepath):
                os.remove(filepath)
                print(f"[INFO] ZIP削除: {filepath}")
            if os.path.exists(folder_to_delete):
                shutil.rmtree(folder_to_delete)
                print(f"[INFO] フォルダ削除: {folder_to_delete}")
        except Exception as e:
            print(f"[削除エラー] {e}")
        return response

    return send_file(filepath, as_attachment=True)

# PDFから画像を抽出してZIP化
def pdf2image(input_path, output_path, image_dir):
    try:
        os.makedirs(image_dir, exist_ok=True)

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
                image_path = os.path.join(image_dir, f"page{page_index+1}_{img_index+1}.{image_ext}")

                with open(image_path, "wb") as img_file:
                    img_file.write(image_bytes)
                    image_count += 1

        if image_count == 0:
            shutil.rmtree(image_dir)
            return False

        with zipfile.ZipFile(output_path, 'w', zipfile.ZIP_DEFLATED) as zipf:
            for root, _, files in os.walk(image_dir):
                for file in files:
                    full_path = os.path.join(root, file)
                    arcname = os.path.relpath(full_path, start=image_dir)
                    zipf.write(full_path, arcname)

        return True
    except Exception as e:
        print(f"[画像抽出エラー] {e}")
        return False

if __name__ == '__main__':
    app.run(debug=True, port=5000)
