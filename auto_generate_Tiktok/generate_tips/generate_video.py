from PIL import Image, ImageDraw, ImageFont
from moviepy.editor import VideoFileClip, ImageClip, CompositeVideoClip
import textwrap
import os
import random
import moviepy.video.fx.all as vfx

from moviepy.video.fx.fadein import fadein  # ✅ クラスではなく関数形式で読み込む
# def get_english_date():
#     now = datetime.now()
#     day = now.day
#     suffix = 'th' if 11 <= day <= 13 else {1: 'st', 2: 'nd', 3: 'rd'}.get(day % 10, 'th')
#     return now.strftime(f"%B {day}{suffix}")


def draw_multiline_text_with_padding(draw, text, font, x, y, line_width, line_spacing=20,):
    lines = textwrap.wrap(text, width=line_width)
    for i, line in enumerate(lines):
        fill = (255, 255, 255)  # 白色に変更
        draw.text((x, y + i * (font.size + line_spacing)), line, font=font, fill=fill)


def draw_centered_text(draw, text, font, area_x1, area_x2, y):
    text_bbox = draw.textbbox((0, 0), text, font=font)
    text_width = text_bbox[2] - text_bbox[0]
    area_center = (area_x1 + area_x2) // 2
    x = area_center - text_width // 2
    fill = 'white'
    draw.text((x, y), text, font=font, fill=fill)


def create_text_overlay_image(title, summary, output="text_overlay.png"):
    img_width, img_height = 1080, 1920
    img = Image.new("RGBA", (img_width, img_height), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)

    font_title = ImageFont.truetype("C:/Users/as129/Desktop/KU-knowledge-share/auto_generate_Tiktok/fonts/Fredoka-Regular.ttf", 80)
    font_summary = ImageFont.truetype("C:/Windows/Fonts/meiryo.ttc", 50)
    font_summary_t = ImageFont.truetype("C:/Windows/Fonts/meiryo.ttc", 70)
    font_date = ImageFont.truetype("C:/Windows/Fonts/arial.ttf", 48)

    # テキスト描画
    text_color = (255, 255, 255)  # 白色

    y = 600
    draw.text((205, y), "■ " + title, font=font_summary_t, fill=text_color)  # x座標を0に変更
    y += 170
    draw_multiline_text_with_padding(draw, summary, font_summary, x=205, y=y, line_width=13, line_spacing=12)  # x座標を30に変更

    img.save(output)
    print("✅ テキスト画像作成:", output)



def overlay_text_on_video(base_video="Foods_tips.mp4", text_image="text_overlay.png", output="final_video.mp4"):
    video = VideoFileClip(base_video)

    text_overlay = (
        ImageClip(text_image)
        .set_duration(video.duration - 8)  # 6秒以降から最後まで表示
        .set_start(8)                      # 開始を6秒後に設定
        .set_position(("center", "top"))
    )

    final = CompositeVideoClip([video, text_overlay])
    final.write_videofile(output, codec="libx264", audio=True)






if __name__ == "__main__":
    from fetch_tips import generate_fun_fact_from_wikipedia
    foods = [
    "金平糖", "カステラ", "天ぷら", "ボーロ", "カレーライス", "すき焼き", "ラーメン", "焼きそば",
    "おにぎり", "餅", "羊羹", "団子", "味噌", "醤油", "寿司", "天丼", "親子丼", "納豆", "たこ焼き", "お好み焼き",
    "バウムクーヘン", "ドーナツ", "プリン", "モンブラン", "エクレア", "マシュマロ", "チョコレート",
    "キャラメル", "ポテトチップス", "アイスクリーム", "ヨーグルト", "ピザ", "ハンバーガー",
    "パン", "ビスケット", "スコーン", "ティラミス", "シュークリーム", "ワッフル", "ゼリー", "カップ麺"
]
    num = random.randint(0, len(foods)-1)
    name = foods[num]
    result = generate_fun_fact_from_wikipedia(name)
    print(result)



    create_text_overlay_image(name, result)
    overlay_text_on_video()



