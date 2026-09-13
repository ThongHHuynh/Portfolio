"""
Builds public/Thong_Huynh_Resume_Portfolio.pdf — the resume followed by
landscape A4 portfolio slides, one per project.

    python tools/portfolio/build_portfolio.py

Needs: Google Chrome (or Edge), and `pip install pypdf pillow`.

Edit SLIDES below to change the text, photos or order, then run it again.
Photo paths are relative to src/assets. "focus" is the crop position
("x% y%", same meaning as in src/data/content.ts). The site's own images are
never modified; the PDF gets print-sized copies made in a temp folder.
"""

from __future__ import annotations

import html
import os
import shutil
import subprocess
import sys
import tempfile
from pathlib import Path

from PIL import Image, ImageOps
from pypdf import PdfReader, PdfWriter

ROOT = Path(__file__).resolve().parents[2]
ASSETS = ROOT / "src" / "assets"
RESUME = ROOT / "public" / "Thong_Huynh_Resume.pdf"
OUTPUT = ROOT / "public" / "Thong_Huynh_Resume_Portfolio.pdf"

OWNER = {
    "name": "Thong Huynh",
    "role": "Robotics Engineer",
    "email": "thonghuynh.0203@gmail.com",
    "github": "github.com/ThongHHuynh",
    "linkedin": "linkedin.com/in/thonghuynh1",
}

# Slide copy is deliberately worded differently from the resume page before
# it: the resume lists what was done, the slides say what the thing is and
# why it matters. Keep each line short.
SLIDES = [
    {
        "title": "Bolt Eye",
        "subtitle": "Automated Inspection System",
        "context": "Project",
        "period": "August 2025 – Present",
        "summary": "A conveyor vision cell that counts, sorts and quality-checks screws, bolts and nuts as they pass.",
        "points": [
            "End-to-end design, fully 3D-printed.",
            "Real-time detection and segmentation.",
            "Sorts parts by size and shape with millimetre accuracy.",
        ],
        "skills": ["Computer vision", "3D printing", "Real-time systems", "CAD design"],
        "tools": ["YOLOv11", "DINOv2", "OpenCV", "PyTorch", "SolidWorks", "Jetson Nano"],
        # First image is the large one; the rest form the row beneath it.
        "images": [
            ("BoltEye.jpg", "45% 50%"),
            ("BoltEye-1.jpg", "50% 60%"),
            ("BoltEye-2.jpg", "50% 26%"),
        ],
    },
    {
        "title": "RoboMaster Robot",
        "subtitle": "Omnidirectional Chassis and Turret",
        "context": "Ontario Tech RoboMaster",
        "period": "September 2024 – Present",
        "summary": "A robot built for combat in the RoboMaster North America (ARC) competition.",
        "points": [
            "Mechanical design directed end to end in SolidWorks, DFM/DFA compliant.",
            "Custom turret: timing-belt yaw and herringbone-gear pitch, minimizing backlash for accuracy.",
        ],
        "skills": ["Mechanical design", "GD&T", "Design for manufacture", "Design leadership"],
        "tools": ["SolidWorks", "GD&T", "DFM/DFA", "Engineering drawings"],
        "images": [
            ("RM-2.png", "45% 50%"),
            ("RM-3.png", "50% 50%"),
            ("RM-1.png", "50% 52%"),
        ],
    },
    {
        "title": "Digital Twin Work Cell",
        "subtitle": "Isaac Sim Validation Pipeline",
        "context": "ABI Ltd.",
        "period": "May 2026 – Present",
        "summary": "A virtual copy of a robotic bread-scoring cell, so layouts and motions are proven before any hardware moves.",
        "points": [
            "Arm, conveyor and sensors simulated closely to the real cell.",
            "Robot motion and system behavior tested entirely in simulation.",
            "Significantly reduced commissioning time.",
        ],
        "skills": ["Robotics simulation", "Industrial communication protocols"],
        "tools": ["NVIDIA Isaac Sim", "RobotStudio", "ABB IRB1200", "ROS 2", "Python"],
        "images": [
            ("Isaac-2.png", "50% 50%"),
            ("Isaac-1.png", "45% 50%"),
        ],
    },
    {
        "title": "Pegasus",
        "subtitle": "Hybrid Multimodal Quadruped",
        "context": "MARS Lab",
        "period": "May 2025 – May 2026",
        "summary": "A research robot that combines walking and flying on one platform.",
        "points": [
            "Increased payload over the original robot by 15% with custom trot kinematics.",
            "Designed custom sensor mounts.",
            "Simulated in Gazebo for behavior validation.",
        ],
        "skills": ["Legged locomotion", "Mechanical design", "Kinematics", "3D mapping"],
        "tools": ["ROS", "Gazebo", "PX4/MAVROS", "OctoMap", "SolidWorks"],
        "images": [
            ("Pegasus-4.jpg", "50% 55%"),
            ("Pegasus-5.jpg", "50% 50%"),
            ("Pegasus-3.jpg", "50% 70%"),
            ("Pegasus.jpeg", "50% 62%"),
        ],
    },
    {
        "title": "SensQ",
        "subtitle": "Autonomous Mobile Robot Platform",
        "context": "Project",
        "period": "January 2026 – Present",
        "summary": "A compact robot that maps a space, covers every part of it, and finds its own way back to dock.",
        "points": [
            "Chassis and hardware 3D-printed and assembled in-house.",
            "Coverage path planning with A* and Boustrophedon cell decomposition.",
            "Docking and alignment with AprilTags.",
        ],
        "skills": ["Mobile robotics", "SLAM", "Path planning", "Hardware integration"],
        "tools": ["ROS 2", "Nav2", "SLAM Toolbox", "AprilTag", "Python"],
        "images": [
            ("SensQ-2.jpg", "50% 70%"),
            ("SensQ-3.jpg", "50% 50%"),
            ("AMR.jpg", "50% 75%"),
        ],
    },
    {
        "title": "6-DOF Robotic Arm",
        "subtitle": "Pick and Place Robot",
        "context": "Project",
        "period": "May 2024 – January 2026",
        "summary": "A six-axis robot arm for pick-and-place tasks with high precision and repeatability.",
        "points": [
            "Designed in SolidWorks and fully 3D-printed, with a 2 kg payload and minimal backlash.",
            "Path planning with L-BFGS-B optimization for smooth, reachable motion.",
            "Simulated in Gazebo to preview motion.",
        ],
        "skills": ["Robot kinematics", "Optimization", "Motion planning", "CAD design"],
        "tools": ["ROS", "RViz", "Python", "L-BFGS-B", "SolidWorks"],
        "images": [
            ("6-DOF-1.png", "25% 50%"),
            ("Arm.jpg", "50% 60%"),
            ("6-DOF-2.jpg", "50% 50%"),
            ("6-DOF-3.png", "50% 45%"),
        ],
    },
]

# Print resolution for embedded photos: 2000px on the long edge is ~300 dpi
# at the size they occupy on an A4 slide — sharp in print, and it keeps the
# PDF small enough to email.
PRINT_LONG_EDGE = 2000

CSS = """
@page { size: A4 landscape; margin: 0; }
* { box-sizing: border-box; }
html, body { margin: 0; background: #fff; }
body { font-family: "Segoe UI", -apple-system, "Helvetica Neue", Arial, sans-serif; color: #14130f;
       -webkit-print-color-adjust: exact; print-color-adjust: exact; }
.slide { width: 297mm; height: 210mm; padding: 13mm 15mm 11mm; display: grid;
         grid-template-rows: auto minmax(0, 1fr) auto; gap: 7mm; page-break-after: always; break-after: page; overflow: hidden; }
.slide:last-child { page-break-after: auto; break-after: auto; }
.top { display: flex; justify-content: space-between; align-items: baseline;
       font-size: 8.5pt; letter-spacing: 0.16em; text-transform: uppercase; color: #6a675e; font-weight: 700; }
.top .accent { color: #1d4ed8; }
.body { display: grid; grid-template-columns: minmax(0, 1.18fr) minmax(0, 1fr); grid-template-rows: minmax(0, 1fr); gap: 11mm; min-height: 0; }
.media { display: grid; grid-template-rows: minmax(0, 2.1fr) minmax(0, 1fr); gap: 4mm; min-height: 0; height: 100%; }
.thumbs { display: grid; grid-auto-flow: column; grid-auto-columns: minmax(0, 1fr); gap: 4mm; min-height: 0; }
.media img { width: 100%; height: 100%; min-height: 0; object-fit: cover; border-radius: 3mm; display: block; background: #f2f1ec; }
.media.single { grid-template-rows: minmax(0, 1fr); }
.text { display: flex; flex-direction: column; min-height: 0; }
h1 { margin: 0; font-size: 30pt; font-weight: 600; letter-spacing: -0.02em; line-height: 1.05; }
.subtitle { margin: 2.5mm 0 0; font-size: 13pt; color: #6a675e; }
.summary { margin: 6mm 0 0; font-size: 11pt; line-height: 1.55; }
.label { margin: 7mm 0 2.5mm; font-size: 8pt; letter-spacing: 0.16em; text-transform: uppercase; color: #6a675e; font-weight: 700;
         padding-bottom: 2mm; border-bottom: 0.3mm solid #e6e4dc; }
ul { margin: 0; padding: 0; list-style: none; display: grid; gap: 2.6mm; }
li { position: relative; padding-left: 5mm; font-size: 10.5pt; line-height: 1.5; }
/* A real dash glyph, not a drawn 0.35mm bar: Chrome snaps bars that thin to
   0.75pt or 1.5pt depending on position when printing, so some came out bold. */
li::before { content: "–"; position: absolute; left: 0; top: 0; font-weight: 400; color: #14130f; }
.tools { display: flex; flex-wrap: wrap; gap: 2mm; }
.tools span { padding: 1.1mm 3mm; border: 0.3mm solid #c9c5ba; border-radius: 99mm; font-size: 8.5pt; color: #3f3c35; }
/* Skills read as capabilities: filled tags, distinct from the outlined tools. */
.skills span { background: #f2f1ec; border-color: #f2f1ec; color: #14130f; }
.foot { display: flex; justify-content: space-between; align-items: baseline; padding-top: 3mm;
        border-top: 0.3mm solid #e6e4dc; font-size: 8.5pt; color: #6a675e; }
.foot strong { color: #14130f; font-weight: 600; }
"""


def find_chrome() -> str:
    candidates = [
        os.environ.get("CHROME", ""),
        r"C:\Program Files\Google\Chrome\Application\chrome.exe",
        r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe",
        "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
        shutil.which("google-chrome") or "",
        shutil.which("chromium") or "",
    ]
    for path in candidates:
        if path and Path(path).exists():
            return path
    sys.exit("Chrome or Edge not found. Set the CHROME environment variable to its path.")


def print_copy(name: str, workdir: Path) -> Path:
    """Upright, print-sized JPEG copy of an asset for embedding in the PDF."""
    source = ASSETS / name
    if not source.exists():
        sys.exit(f"Missing image: src/assets/{name}")
    image = ImageOps.exif_transpose(Image.open(source)).convert("RGB")
    image.thumbnail((PRINT_LONG_EDGE, PRINT_LONG_EDGE), Image.LANCZOS)
    target = workdir / (Path(name).stem + ".jpg")
    image.save(target, "JPEG", quality=86, optimize=True, progressive=True)
    return target


def slide_html(index: int, slide: dict, workdir: Path) -> str:
    e = html.escape
    tags = [
        f'<img src="{print_copy(name, workdir).name}" style="object-position:{focus}" alt="">'
        for name, focus in slide["images"]
    ]
    # Lead photo large; any others share the row beneath it.
    images = tags[0] + (f'<div class="thumbs">{"".join(tags[1:])}</div>' if len(tags) > 1 else "")
    media_class = "media" if len(slide["images"]) > 1 else "media single"
    points = "".join(f"<li>{e(p)}</li>" for p in slide["points"])
    tools = "".join(f"<span>{e(t)}</span>" for t in slide["tools"])
    skills = "".join(f"<span>{e(k)}</span>" for k in slide["skills"])
    return f"""
<section class="slide">
  <div class="top">
    <span><span class="accent">{e(slide["context"])}</span> &nbsp;·&nbsp; {e(slide["period"])}</span>
    <span>Portfolio &nbsp;{index:02d} / {len(SLIDES):02d}</span>
  </div>
  <div class="body">
    <div class="{media_class}">{images}</div>
    <div class="text">
      <h1>{e(slide["title"])}</h1>
      <p class="subtitle">{e(slide["subtitle"])}</p>
      <p class="summary">{e(slide["summary"])}</p>
      <p class="label">Highlights</p>
      <ul>{points}</ul>
      <p class="label">Skills</p>
      <div class="tools skills">{skills}</div>
      <p class="label">Tools</p>
      <div class="tools">{tools}</div>
    </div>
  </div>
  <div class="foot">
    <span><strong>{e(OWNER["name"])}</strong></span>
    <span>{e(OWNER["email"])} &nbsp;·&nbsp; {e(OWNER["github"])} &nbsp;·&nbsp; {e(OWNER["linkedin"])}</span>
  </div>
</section>"""


def main() -> None:
    if not RESUME.exists():
        sys.exit(f"Resume not found at {RESUME}")

    with tempfile.TemporaryDirectory() as tmp:
        workdir = Path(tmp)
        sections = "".join(slide_html(i, s, workdir) for i, s in enumerate(SLIDES, start=1))
        page = workdir / "slides.html"
        page.write_text(
            f'<!doctype html><html lang="en"><head><meta charset="utf-8">'
            f"<style>{CSS}</style></head><body>{sections}</body></html>",
            encoding="utf-8",
        )

        slides_pdf = workdir / "slides.pdf"
        subprocess.run(
            [
                find_chrome(), "--headless=new", "--disable-gpu", "--no-pdf-header-footer",
                "--virtual-time-budget=5000", f"--print-to-pdf={slides_pdf}", page.as_uri(),
            ],
            check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL, timeout=120,
        )

        writer = PdfWriter()
        for source in (RESUME, slides_pdf):
            for pdf_page in PdfReader(source).pages:
                writer.add_page(pdf_page)
        writer.add_metadata({"/Title": f"{OWNER['name']} — Resume and Portfolio", "/Author": OWNER["name"]})
        with OUTPUT.open("wb") as handle:
            writer.write(handle)

    pages = len(PdfReader(OUTPUT).pages)
    print(f"Wrote {OUTPUT.relative_to(ROOT)} — {pages} pages, {OUTPUT.stat().st_size / 1_048_576:.1f} MB")


if __name__ == "__main__":
    main()
