import amrImage from "../assets/AMR.jpg";
import armImage from "../assets/Arm.jpg";
import boltEyeImage from "../assets/BoltEye.jpg";
import demoFestImage from "../assets/DemoFest.jpg";
import droneImage from "../assets/Drone.jpg";
import iyrcImage from "../assets/IYRC.jpg";
import makeXImage from "../assets/MakeX.jpg";
import marsLabImage from "../assets/MarsLab.jpeg";
import pegasusImage from "../assets/Pegasus.jpeg";
import portraitImage from "../assets/Portrait.jpg";

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
  role: "Robotics Software Engineer",
  location: "Ontario, Canada",
  photo: portraitImage,
  tagline: "I like to build robots that solve real problems",
  bio: "Hi, I'm Thong Huynh — most people call me Tom. I'm a robotics software engineer passionate about robotics, AI and automation. I build and validate industrial robotic systems, from digital twins to computer vision pipelines, and design my own robots on the side.",
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
    slug: "sensq",
    name: "SensQ",
    subtitle: "Autonomous Mobile Robot Platform",
    period: "January 2026 – Present",
    context: "Independent project",
    image: amrImage,
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
    slug: "digital-twin",
    name: "Digital Twin Work Cell",
    subtitle: "Isaac Sim Validation Pipeline",
    period: "May 2026 – Present",
    context: "ABI Ltd.",
    image: marsLabImage,
    summary:
      "A high-fidelity NVIDIA Isaac Sim twin of an ABB IRB1200 bread-scoring cell, used to validate sensors and path planning before anything is deployed to the floor.",
    tools: ["NVIDIA Isaac Sim", "ABB IRB1200", "ROS 2", "Python"],
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
    slug: "pegasus",
    name: "Pegasus",
    subtitle: "Hybrid Multimodal Quadruped",
    period: "May 2025 – May 2026",
    context: "MARS Lab",
    image: pegasusImage,
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
    slug: "robotic-arm",
    name: "6-DOF Robotic Arm",
    subtitle: "Simulation and Control in ROS",
    period: "May 2024 – January 2026",
    context: "Independent project",
    image: armImage,
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
