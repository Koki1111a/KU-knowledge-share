from PIL import Image, ImageDraw, ImageFont
from moviepy.editor import VideoFileClip, ImageClip, CompositeVideoClip
import textwrap
import os
from datetime import datetime


def get_english_date():
    now = datetime.now()
    day = now.day
    suffix = 'th' if 11 <= day <= 13 else {1: 'st', 2: 'nd', 3: 'rd'}.get(day % 10, 'th')
    return now.strftime(f"%B {day}{suffix}")


def draw_multiline_text_with_padding(draw, text, font, x, y, line_width, line_spacing=20,):
    lines = textwrap.wrap(text, width=line_width)
    for i, line in enumerate(lines):
        fill = (26, 49, 84)
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

    font_title = ImageFont.truetype("fonts/Fredoka-Bold.ttf", 80)
    font_summary = ImageFont.truetype("C:/Windows/Fonts/meiryo.ttc", 34)
    font_date = ImageFont.truetype("C:/Windows/Fonts/arial.ttf", 48)

    # テキスト描画
    background_color = (26, 49, 84)

    y = 600
    draw.text((60, y), "■ " + title, font=font_summary, fill=background_color)
    y += 140
    draw_multiline_text_with_padding(draw, summary, font_summary, x=80, y=y, line_width=28, line_spacing=12)

    # 日付を赤枠中央に
    date_str = get_english_date()
    draw_centered_text(draw, date_str, font_title, area_x1=200, area_x2=880, y=1650)

    img.save(output)
    print("✅ テキスト画像作成:", output)

import moviepy.video.fx.all as vfx

from moviepy.video.fx.fadein import fadein  # ✅ クラスではなく関数形式で読み込む

def overlay_text_on_video(base_video="international.mp4", text_image="text_overlay.png", output="final_video.mp4"):
    video = VideoFileClip(base_video)

    text_overlay = (
        ImageClip(text_image)
        .set_duration(video.duration - 1)
        .set_start(1)
        .set_position(("center", "top"))
    )


    # ✅ フェードイン（1秒間） ← fadein 関数として適用
    text_overlay = fadein(text_overlay, duration=1)

    final = CompositeVideoClip([video, text_overlay])
    final.write_videofile(output, codec="libx264", audio=True)






if __name__ == "__main__":
    from fetch_news import fetch_latest_news

    news = fetch_latest_news("国際")
    title = news["title"]
    summary = news["summary"]


    create_text_overlay_image(title, summary)
    overlay_text_on_video()



