import amrImage from "../assets/AMR.jpg";
import sensq2 from "../assets/SensQ-2.jpg";
import sensq3 from "../assets/SensQ-3.jpg";
import armImage from "../assets/Arm.jpg";
import arm1 from "../assets/6-DOF-1.png";
import arm2 from "../assets/6-DOF-2.jpg";
import arm3 from "../assets/6-DOF-3.png";
import boltEyeImage from "../assets/BoltEye.jpg";
import boltEye1 from "../assets/BoltEye-1.jpg";
import boltEye2 from "../assets/BoltEye-2.jpg";
import demoFestImage from "../assets/DemoFest.jpg";
import droneImage from "../assets/Drone.jpg";
import drone1 from "../assets/Drone-1.jpg";
import drone2 from "../assets/Drone-2.jpg";
import iyrcImage from "../assets/IYRC.jpg";
import iyrc1 from "../assets/IYRC1.jpg";
import iyrc3 from "../assets/IYRC3.jpg";
import makeXImage from "../assets/MAKEX.JPG";
import makeX1 from "../assets/MAKEX1.JPG";
import Isaac1 from "../assets/Isaac-1.png";
import Isaac2 from "../assets/Isaac-2.png";
import eyeq1 from "../assets/EyeQ-1.jpg";
import eyeq2 from "../assets/EyeQ-2.jpg";
import pegasusImage from "../assets/Pegasus.jpeg";
import pegasus3 from "../assets/Pegasus-3.jpg";
import pegasus4 from "../assets/Pegasus-4.jpg";
import pegasus5 from "../assets/Pegasus-5.jpg";
import pegasusVideo from "../assets/Pegasus-1.MOV";
import rm1 from "../assets/RM-1.png";
import rm2 from "../assets/RM-2.png";
import rm3 from "../assets/RM-3.png";
import portraitImage from "../assets/Portrait.jpg";

/**
 * Where to crop each photo in cards and carousels, as a CSS object-position:
 * "x% y%". "50% 50%" crops from the centre; raise y to keep more of the
 * bottom of the photo, raise x to keep more of the right. Set by where the
 * subject sits in each shot. A photo missing from this list crops centred.
 */
const imageFocus: Record<string, string> = {
  [amrImage]: "50% 78%", // AMR.jpg
  [sensq2]: "50% 82%", // SensQ-2.jpg
  [sensq3]: "50% 50%", // SensQ-3.jpg
  [armImage]: "50% 63%", // Arm.jpg
  [arm1]: "50% 50%", // 6-DOF-1.png
  [arm2]: "50% 50%", // 6-DOF-2.jpg
  [arm3]: "50% 50%", // 6-DOF-3.png
  [boltEyeImage]: "40% 50%", // BoltEye.jpg
  [boltEye1]: "50% 63%", // BoltEye-1.jpg
  [boltEye2]: "50% 50%", // BoltEye-2.jpg
  [demoFestImage]: "50% 77%", // DemoFest.jpg
  [droneImage]: "100% 50%", // Drone.jpg
  [drone1]: "50% 50%", // Drone-1.jpg
  [drone2]: "50% 50%", // Drone-2.jpg
  [iyrcImage]: "50% 50%", // IYRC.jpg
  [iyrc1]: "50% 50%", // IYRC1.jpg
  [iyrc3]: "50% 44%", // IYRC3.jpg
  [makeXImage]: "50% 50%", // MAKEX.JPG
  [makeX1]: "35% 50%", // MAKEX1.JPG
  [Isaac1]: "45% 50%", // Isaac-1.png
  [Isaac2]: "50% 50%", // Isaac-2.png
  [eyeq1]: "50% 50%", // EyeQ-1.jpg
  [eyeq2]: "50% 50%", // EyeQ-2.jpg
  [pegasusImage]: "50% 66%", // Pegasus.jpeg
  [pegasus3]: "50% 77%", // Pegasus-3.jpg
  [pegasus4]: "50% 55%", // Pegasus-4.jpg
  [pegasus5]: "50% 50%", // Pegasus-5.jpg
  [rm1]: "50% 52%", // RM-1.png
  [rm2]: "45% 50%", // RM-2.png
  [rm3]: "50% 50%", // RM-3.png
};

export function focusFor(src: string | undefined): string | undefined {
  return src ? imageFocus[src] : undefined;
}

/**
 * A gallery item on a detail page. Entries may carry several — images, video,
 * or a mix. Add a `media: [...]` array to any project or side quest below and
 * it replaces the single hero image automatically.
 */
export type MediaItem =
  | { type: "image"; src: string; alt: string }
  | { type: "video"; src: string; poster?: string; alt: string };

export type Project = {
  slug: string;
  name: string;
  subtitle: string;
  period: string;
  context: string;
  image: string;
  summary: string;
  tools: string[];
  overview: string[];
  highlights: string[];
  /** Capabilities exercised, as distinct from the tools listed above. */
  skills: string[];
  /** Optional gallery. Falls back to the single `image` when omitted. */
  media?: MediaItem[];
  featured: boolean;
};

export type WorkRole = {
  company: string;
  role: string;
  period: string;
  location: string;
  points: string[];
};

export const profile = {
  name: "Thong Huynh",
  shortName: "Tom",
  role: "Robotics Engineer",
  location: "Ontario, Canada",
  photo: portraitImage,
  tagline: "I like to build robots that solve real problems",
  bio: "Hi, I'm Thong Huynh — most people call me Tom. I'm a robotics engineer passionate about robotics, AI and automation. I build and validate industrial robotic systems, from digital twins to computer vision pipelines, and design my own robots on the side.",
  secondary:
    "Right now I'm building autonomous systems for small and medium manufacturers, helping them adopt automation that used to be out of reach.",
};

export const contact = {
  email: "thonghuynh.0203@gmail.com",
  schoolEmail: "thong.huynh@ontariotechu.net",
  linkedin: "https://www.linkedin.com/in/thonghuynh1/",
  linkedinHandle: "in/thonghuynh1",
  github: "https://github.com/ThongHHuynh/",
  githubHandle: "ThongHHuynh",
  resume: "/Thong_Huynh_Resume.pdf",
  /** Resume + portfolio slides. Regenerate with tools/portfolio/build_portfolio.py. */
  resumePortfolio: "/Thong_Huynh_Resume_Portfolio.pdf",
};

export const education = {
  school: "Ontario Tech University",
  degree: "B.Eng., Mechatronics Engineering",
  detail: "GPA 4.25 / 4.3",
  period: "2024 – 2028",
};

export const awards = [
  { title: "Undergraduate Research Award", org: "Ontario Tech University" },
  { title: "STAR Award", org: "Ontario Tech University" },
  { title: "Merit Award", org: "Ontario Tech University" },
  { title: "International Leader Award", org: "University of Alberta" },
  { title: "President's List", org: "CGPA 4.25 / 4.3" },
];

export type SideQuestEntry = {
  slug: string;
  name: string;
  event: string;
  result: string;
  year: string;
  image: string;
  description: string;
  overview: string[];
  highlights: string[];
  tools: string[];
  skills: string[];
  /** Optional gallery. Falls back to the single `image` when omitted. */
  media?: MediaItem[];
};

/** Competitions and side builds — the "besides projects" material. */
export const sideQuests: SideQuestEntry[] = [
  {
    slug: "demo-fest",
    name: "Line-Following Robot",
    event: "DEMO Fest",
    result: "First Prize",
    year: "2025",
    image: demoFestImage,
    description:
      "Built a line-following robot for Ontario Tech's DEMO Fest and took first prize — sensor calibration and control tuning under a hard demo deadline.",
    tools: [
      "Reflectance sensor array",
      "Closed-loop steering control",
    ],
    skills: [
      "Sensor calibration",
      "Control tuning",
      "Rapid prototyping",
    ],
    overview: [
      "DEMO Fest is Ontario Tech's showcase event, where teams demonstrate a working build to judges and the public on the day.",
      "The robot follows a marked line using reflectance sensing and a closed-loop steering controller. Most of the work was not the mechanism but the tuning — calibrating sensors against the venue's lighting and surface, then trimming the control response so it tracked corners without oscillating.",
    ],
    highlights: [
      "Designed and built a line-following robot end to end for the event.",
      "Calibrated the reflectance sensor array against the venue's real lighting and floor.",
      "Tuned the steering control loop to hold the line through corners without weaving.",
      "Took First Prize.",
    ],
  },
  {
    slug: "iyrc",
    name: "Volleyball & Line-Following Robots",
    event: "International Youth Robot Competition",
    result: "First Prize",
    year: "2019",
    image: iyrcImage,
    media: [
      { type: "image", src: iyrcImage, alt: "On stage at IYRC 2019 in Korea" },
      { type: "image", src: iyrc1, alt: "The two competition robots, side by side" },
      { type: "image", src: iyrc3, alt: "Running the line-following course at IYRC" },
    ],
    description:
      "Competed at IYRC with a volleyball-playing robot and a line-following robot, taking first prize. The competition that started all of this.",
    tools: [
      "Competition robot kit",
    ],
    skills: [
      "Mechanism design",
      "Designing to a rulebook",
      "Competition strategy",
    ],
    overview: [
      "IYRC is an international youth robotics competition with several event categories. I entered two: a volleyball-playing robot and a line-following robot.",
      "This was the competition that got me into robotics in the first place — the first time building a machine to meet a scored objective rather than just to see if it would work.",
    ],
    highlights: [
      "Built a volleyball-playing robot for the head-to-head category.",
      "Built a separate line-following robot for the timed track category.",
      "Took First Prize at the international event.",
      "First real exposure to designing against a competition rulebook.",
    ],
  },
  {
    slug: "makex",
    name: "Moon Mission Robot",
    event: "MakeX",
    result: "Innovative Design",
    year: "2019",
    image: makeXImage,
    media: [
      { type: "image", src: makeXImage, alt: "Receiving the award at MakeX Robotics Competition 2019" },
      { type: "image", src: makeX1, alt: "Setting up the robot on the MakeX field" },
    ],
    description:
      "Designed a moon-mission robot for MakeX and was recognised for innovative design — an early lesson in building mechanisms for a scored objective.",
    tools: [
      "Competition robot kit",
    ],
    skills: [
      "Mechanism design",
      "Designing for a scored objective",
      "Iterative prototyping",
    ],
    overview: [
      "MakeX sets a themed challenge each season; this one was framed as a lunar mission, with scoring tied to collecting and placing objects around the field.",
      "The award was for innovative design rather than final score, which made the mechanism itself the interesting part — working out how to complete the field tasks with a mechanism simple enough to build and keep running.",
    ],
    highlights: [
      "Designed a robot around the MakeX moon-mission field tasks.",
      "Built the collection and placement mechanism for the scored objectives.",
      "Recognised with the Innovative Design award.",
    ],
  },
  {
    slug: "fpv-drone",
    name: "FPV Drone Racing",
    event: "Personal build",
    result: "For the fun of it",
    year: "Ongoing",
    image: droneImage,
    media: [
      { type: "image", src: droneImage, alt: "FPV drone build" },
      { type: "image", src: drone2, alt: "Ducted FPV quad from above, flight controller exposed" },
      { type: "image", src: drone1, alt: "Soldering the motor wires to the ESC" },
    ],
    description:
      "Building and flying FPV drones. Nothing to win here — just the fastest way I know to learn about control, tuning and repairing your own hardware.",
    tools: [
      "FPV quadcopter",
      "Flight controller",
    ],
    skills: [
      "PID tuning",
      "Hardware diagnosis and repair",
      "Manual flight control",
    ],
    overview: [
      "FPV — first person view — means flying from the drone's camera feed rather than watching it from the ground. There is no autopilot smoothing your inputs, so the aircraft does exactly what you tell it to.",
      "It is the most direct feedback loop I have found for learning control. You feel a badly tuned PID loop immediately, and every crash means diagnosing and repairing your own hardware.",
    ],
    highlights: [
      "Build, tune and repair my own FPV quadcopters.",
      "Hands-on practice with PID tuning, where the results are immediate and unforgiving.",
      "Ongoing — the one thing on this page with no scoreboard attached.",
    ],
  },
];

export function getSideQuest(slug: string | undefined) {
  return sideQuests.find((entry) => entry.slug === slug);
}

export const extracurriculars = [
  {
    role: "Design Team Lead",
    org: "Ontario Tech RoboMaster",
    period: "September 2024 – Present",
    description:
      "Leading mechanical design for a 500+ component competition robot, running design reviews and mentoring members in CAD, GD&T and drawings.",
  },
  {
    role: "Mechanical Team Member",
    org: "RoboMaster North America",
    period: "Fall 2024 – Winter 2025",
    description:
      "Assembly and mechanical design for the 2025 RoboMaster NA competition robot.",
  },
  {
    role: "Mechanical Design Intern",
    org: "Quoc Truong Limited",
    period: "Fall 2024",
    description:
      "Designed bolts and nuts for manufacturing, working to real production constraints.",
  },
];

export const competitions = [
  "International Youth Robot Competition",
  "MakeX",
  "FIRST Robotics",
];

export const skills = [
  {
    group: "CAD and Design",
    items: [
      "SolidWorks Certified Professional",
      "Siemens NX",
      "Fusion 360",
      "GD&T",
      "DFM/DFA",
    ],
  },
  {
    group: "Robotics Hardware",
    items: [
      "NVIDIA Jetson Orin Nano/AGX",
      "Raspberry Pi",
      "Depth cameras",
      "LiDAR",
      "IMUs",
      "Actuators",
    ],
  },
  {
    group: "Robotics and Simulation",
    items: ["ROS 2", "Gazebo", "NVIDIA Isaac Sim", "NVIDIA Isaac Lab", "Nav2"],
  },
  {
    group: "Programming and Vision",
    items: [
      "Linux",
      "Python",
      "C++",
      "OpenCV",
      "PyTorch",
      "YOLO",
      "RF-DETR",
      "DINO/DINOv2",
    ],
  },
];

export const work: WorkRole[] = [
  {
    company: "ABI Ltd.",
    role: "Robotics Software Engineer",
    period: "May 2026 – Present",
    location: "Ontario, Canada",
    points: [
      "Developed end-to-end digital twins of industrial robotic work cells in NVIDIA Isaac Sim to accelerate system validation before deployment.",
      "Architected an in-house, two-stage YOLO with CNN head for a bakery inspection pipeline, achieving <100ms inference latency and cutting $100K in outsourcing costs.",
      "Engineered an internal computer vision tooling suite adopted company-wide across the engineering team, improving data labeling and model evaluation workflows.",
      "Supporting the integration of 6-DOF ABB robotic arms for high-speed automated bread-scoring systems.",
    ],
  },
  {
    company: "MARS Lab",
    role: "Research Assistant",
    period: "May 2025 – May 2026",
    location: "Ontario Tech University",
    points: [
      "Developed a hybrid multimodal walking-and-flying robotic platform, designing 10+ custom mechanical components to optimize structural rigidity and payload capacity.",
      "Formulated forward/inverse kinematics for quadruped locomotion and built an end-to-end Gazebo simulation pipeline for dynamic gait and motion validation.",
      "Implemented OctoMap-based 3D mapping, navigation and obstacle avoidance via MAVROS.",
    ],
  },
  {
    company: "Ontario Tech RoboMaster",
    role: "Design Team Lead",
    period: "September 2024 – Present",
    location: "Ontario Tech University",
    points: [
      "Directed the mechanical design of a 500+ component competition robot in SolidWorks, ensuring full DFM/DFA compliance for manufacturing.",
      "Managed CAD version control and conducted design reviews to maintain consistency across mechanical and robotic subsystems.",
      "Mentored team members in mechanical design, GD&T, engineering drawings and robotics design principles.",
    ],
  },
];


/**
 * Gallery for a detail page. An entry with no `media` array still gets a
 * one-item gallery built from its cover image, so the carousel never has to
 * special-case missing data.
 */
export function galleryFor(entry: {
  image: string;
  name: string;
  media?: MediaItem[];
}): MediaItem[] {
  if (entry.media && entry.media.length > 0) {
    return entry.media;
  }

  return [{ type: "image", src: entry.image, alt: entry.name }];
}

export const projects: Project[] = [
  {
    slug: "digital-twin",
    name: "Digital Twin Work Cell",
    subtitle: "Isaac Sim Validation Pipeline",
    period: "May 2026 – Present",
    context: "ABI Ltd.",
    image: Isaac1,
    summary:
      "A high-fidelity NVIDIA Isaac Sim twin of an ABB IRB1200 bread-scoring cell, used to validate sensors and path planning before anything is deployed to the floor.",
    tools: ["NVIDIA Isaac Sim", "ABB IRB1200", "ROS 2", "Python"],
    media: [
      { type: "image", src: Isaac1, alt: "Digital twin work cell in NVIDIA Isaac Sim" },
      { type: "image", src: Isaac2, alt: "Digital twin work cell, second view" },
    ],
    overview: [
      "Commissioning an industrial work cell on the factory floor is slow and expensive. This digital twin moves that validation into simulation, where a bad path plan costs a re-run instead of a damaged product line.",
      "The twin models the ABB IRB1200 arm, the conveyor, and the sensor placement closely enough that planning and timing work carries over to the real cell.",
    ],
    highlights: [
      "Built end-to-end digital twins of industrial robotic work cells in NVIDIA Isaac Sim.",
      "Validated sensor placement and path planning ahead of physical deployment.",
      "Supported integration of 6-DOF ABB robotic arms for high-speed automated bread-scoring.",
      "Shortened the validation loop between a proposed cell layout and a working configuration.",
    ],
    skills: [
      "Simulation and digital twins",
      "Robot cell commissioning",
      "Path planning validation",
      "Sensor placement",
    ],
    featured: true,
  },
  {
    slug: "eyeq",
    name: "EyeQ",
    subtitle: "AI Bakery Inspection Model",
    period: "May 2026 – Present",
    context: "ABI Ltd.",
    image: eyeq1,
    summary:
      "An in-house, two-stage vision model that inspects bakery products on the line in under 100ms — replacing an outsourced service and cutting $100K in costs.",
    tools: ["YOLO", "CNN", "PyTorch", "Python"],
    media: [
      { type: "image", src: eyeq1, alt: "EyeQ flagging overlapping and touching pieces on the conveyor" },
      { type: "image", src: eyeq2, alt: "EyeQ output: misshapen, overlap, touching and bad-tip detections" },
    ],
    overview: [
      "EyeQ is ABI's in-house AI model for inspecting bakery products as they move down the production line. It looks at every piece on the conveyor and decides which ones pass and which need attention.",
      "It works in two stages: a YOLO model detects and segments each piece, then a CNN head classifies it. Keeping the whole pipeline under 100ms lets it keep pace with the line, and building it in-house replaced an outsourced inspection service.",
    ],
    highlights: [
      "Architected a two-stage pipeline — YOLO detection and segmentation followed by a CNN classification head.",
      "Reached under 100ms inference latency, fast enough for a live production line.",
      "Flags pieces that are misshapen, overlapping, touching or have a bad tip, and detects the scoring slits, each with a confidence score.",
      "Brought inspection in-house, cutting $100K in outsourcing costs.",
    ],
    skills: [
      "Computer vision",
      "Instance segmentation",
      "Model architecture",
      "Real-time inference",
      "Production ML deployment",
    ],
    featured: true,
  },
  {
    slug: "sensq",
    name: "SensQ",
    subtitle: "Autonomous Mobile Robot Platform",
    period: "January 2026 – Present",
    context: "Independent project",
    image: amrImage,
    media: [
      { type: "image", src: amrImage, alt: "Early SensQ prototype with RViz running" },
      { type: "image", src: sensq2, alt: "The finished SensQ platform with its LiDAR" },
      { type: "image", src: sensq3, alt: "SensQ opened up: compute, motor drivers and wiring" },
    ],
    summary:
      "A compact autonomous mobile robot built for warehouse and SME automation, from the physical hardware up through the full ROS 2 navigation stack.",
    tools: ["ROS 2", "Nav2", "SLAM Toolbox", "AprilTag", "Python"],
    overview: [
      "SensQ is a compact autonomous mobile robot platform aimed at small and medium manufacturers who want warehouse automation without the cost of a full industrial fleet.",
      "The project covers the entire stack: designing and assembling the physical drivetrain and sensor mounts, then integrating that hardware with ROS 2 for mapping, localization, planning and docking.",
    ],
    highlights: [
      "Built and deployed an autonomous mobile robot integrating physical hardware with ROS 2.",
      "Implemented Nav2 and SLAM Toolbox for mapping and localization in changing indoor environments.",
      "Wrote custom A* and Boustrophedon coverage planners for systematic area traversal.",
      "Added AprilTag-based docking so the robot returns to its charging station unattended.",
    ],
    skills: [
      "Autonomous navigation",
      "SLAM and mapping",
      "Coverage path planning",
      "Hardware integration",
      "Fiducial docking",
    ],
    featured: true,
  },
  {
    slug: "bolt-eye",
    name: "Bolt Eye",
    subtitle: "Automated Inspection System",
    period: "August 2025 – Present",
    context: "Independent project",
    image: boltEyeImage,
    media: [
      { type: "image", src: boltEyeImage, alt: "CAD render of the Bolt Eye conveyor inspection system" },
      { type: "image", src: boltEye1, alt: "The built conveyor and overhead camera rig" },
      { type: "image", src: boltEye2, alt: "Detections and pass/fail classifications on bolts" },
    ],
    summary:
      "An intelligent computer vision system that detects and classifies surface defects on live production lines at sub-100ms latency.",
    tools: ["YOLOv11", "Mask R-CNN", "DINOv2", "OpenCV", "PyTorch"],
    overview: [
      "Bolt Eye pairs a custom optical inspection rig with a real-time vision pipeline, built to catch surface defects that are easy for a human inspector to miss at line speed.",
      "The hardware and the models were developed together, so lighting, camera placement and model architecture were tuned against the same production conditions.",
    ],
    highlights: [
      "Designed an automated conveyor system integrated with custom optical inspection hardware.",
      "Deployed a real-time inspection pipeline combining YOLOv11, Mask R-CNN and DINOv2.",
      "Detected and classified surface defects down to ≤2mm on active production lines.",
      "Held end-to-end latency under 100ms to keep pace with live line throughput.",
    ],
    skills: [
      "Computer vision",
      "Model training and evaluation",
      "Real-time inference",
      "Optical hardware design",
      "Defect classification",
    ],
    featured: true,
  },
  {
    slug: "pegasus",
    name: "Pegasus",
    subtitle: "Hybrid Multimodal Quadruped",
    period: "May 2025 – May 2026",
    context: "MARS Lab",
    image: pegasusImage,
    media: [
      { type: "image", src: pegasusImage, alt: "Pegasus mounted on its test stand at MARS Lab" },
      { type: "image", src: pegasus4, alt: "Pegasus standing, with its kinematics model on screen" },
      { type: "image", src: pegasus5, alt: "Top-down view of Pegasus: servos, frame and wiring" },
      { type: "image", src: pegasus3, alt: "Pegasus on the bench with its depth camera and onboard compute" },
      { type: "video", src: pegasusVideo, poster: pegasus4, alt: "Video of Pegasus" },
    ],
    summary:
      "A hybrid walking-and-flying robotic platform combining quadruped locomotion with aerial mobility, developed as a research assistant at MARS Lab.",
    tools: ["ROS", "Gazebo", "PX4/MAVROS", "OctoMap", "SolidWorks"],
    overview: [
      "Pegasus explores what a robot can reach when it does not have to choose between walking and flying — walking is efficient over ground, flying clears obstacles that would stop a legged robot entirely.",
      "The work spanned mechanical design, locomotion mathematics and the full simulation and mapping stack.",
    ],
    highlights: [
      "Developed a hybrid multimodal walking-and-flying robotic platform.",
      "Designed 10+ custom mechanical components to optimize structural rigidity and payload capacity.",
      "Formulated forward and inverse kinematics for quadruped locomotion.",
      "Built an end-to-end Gazebo simulation pipeline for dynamic gait and motion validation.",
      "Implemented OctoMap-based 3D mapping, navigation and obstacle avoidance via MAVROS.",
    ],
    skills: [
      "Forward and inverse kinematics",
      "Gait and motion simulation",
      "3D mapping and obstacle avoidance",
      "Mechanical design",
    ],
    featured: true,
  },
  {
    slug: "robomaster",
    name: "RoboMaster Robot",
    subtitle: "Omnidirectional Chassis and Turret",
    period: "September 2024 – Present",
    context: "Ontario Tech RoboMaster",
    image: rm2,
    media: [
      { type: "image", src: rm2, alt: "CAD render of the full robot: mecanum chassis and two-axis turret" },
      { type: "image", src: rm3, alt: "The robot with its turret pitched up, armour plates in place" },
      { type: "image", src: rm1, alt: "Chassis with the armour stripped away, showing the turret yaw ring and its drive" },
    ],
    summary:
      "Mechanical design lead for a 500+ component RoboMaster competition robot — an omnidirectional chassis carrying a two-axis turret — taken from CAD through to manufacture.",
    tools: ["SolidWorks", "GD&T", "DFM/DFA", "Engineering drawings"],
    overview: [
      "Leading design on a competition robot means the assembly is the deliverable, not any one part of it. Five hundred components have to be manufacturable, and they have to stay consistent with whatever the rest of the team is designing around them — which is as much a review and version control problem as a modelling one.",
      "The robot itself is an omnidirectional platform: a mecanum-wheeled chassis, and above it a turret that rotates on a large ring gear and pitches its launcher independently. Most of the design work sits in the interface between those two, where the loads from the drivetrain meet the yaw axis the turret has to turn on cleanly.",
    ],
    highlights: [
      "Directed the mechanical design of a 500+ component competition robot in SolidWorks, ensuring full DFM/DFA compliance for manufacturing.",
      "Managed CAD version control and conducted design reviews to maintain consistency across mechanical and robotic subsystems.",
      "Mentored team members in mechanical design, GD&T, engineering drawings and robotics design principles.",
      "Contributed assembly and mechanical design to the 2025 RoboMaster North America competition robot.",
    ],
    skills: [
      "Mechanical design",
      "GD&T and engineering drawings",
      "Design for manufacture",
      "Design leadership",
    ],
    featured: true,
  },
  {
    slug: "robotic-arm",
    name: "6-DOF Robotic Arm",
    subtitle: "Simulation and Control in ROS",
    period: "May 2024 – January 2026",
    context: "Independent project",
    image: armImage,
    media: [
      { type: "image", src: armImage, alt: "The 6-DOF robotic arm" },
      { type: "image", src: arm1, alt: "CAD render of the arm and its base" },
      { type: "image", src: arm3, alt: "Side view with the kinematic frame points marked" },
      { type: "image", src: arm2, alt: "The arm working alongside a small conveyor" },
    ],
    summary:
      "A functional six-degree-of-freedom robotic arm with custom kinematics and optimization-based path planning, visualized and validated in ROS.",
    tools: ["ROS", "RViz", "Python", "L-BFGS-B", "SolidWorks"],
    overview: [
      "This was the project where the mathematics of robotics stopped being theory. Solving inverse kinematics for a real six-axis arm meant handling singularities, joint limits and reachability rather than clean textbook cases.",
      "Path planning uses L-BFGS-B optimization, with ROS and RViz tooling built alongside it to see what the solver was actually doing.",
    ],
    highlights: [
      "Built a functional 6-DOF robotic arm with custom forward and inverse kinematics.",
      "Implemented L-BFGS-B optimization for constrained path planning.",
      "Developed Python and ROS/RViz tooling for motion visualization and validation.",
      "Iterated the mechanical design in SolidWorks to keep the workspace clear of self-collision.",
    ],
    skills: [
      "Forward and inverse kinematics",
      "Constrained optimization",
      "Motion visualization",
      "Mechanical design",
    ],
    featured: false,
  },
];

export function getProject(slug: string | undefined): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

export const featuredProjects = projects.filter((project) => project.featured);
