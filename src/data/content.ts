import amr from "../assets/AMR.jpg";
import boltEye from "../assets/BoltEye.jpg";
import arm from "../assets/Arm.jpg";
import marsLab from "../assets/MarsLab.jpeg";
import face from "../assets/face.jpg";

export const profile = {
  name: "Thong Huynh",
  shortName: "Tom",
  role: "Robotics Software Engineer",
  location: "Ontario, Canada",
  photo: face,
  bio: "I'm a robotics software engineer passionate about robotics, AI, and automation. I build and validate industrial robotic systems, from digital twins to computer vision pipelines, and design my own robots on the side.",
};

export const work = [
  {
    company: "ABI Ltd.",
    role: "Robotics Software Engineer",
    period: "May 2026 – Present",
    image: marsLab,
    items: [
      {
        title: "Digital Twin",
        description:
          "Built an end-to-end digital twin of an ABB IRB1200 robotic bread-scoring cell in NVIDIA Isaac Sim to accelerate system validation before deployment.",
        tools: ["NVIDIA Isaac Sim", "ABB IRB1200", "ROS 2"],
      },
      {
        title: "End-to-End Computer Vision",
        description:
          "Architected an in-house two-stage YOLO + CNN bakery inspection pipeline achieving <100ms inference latency, cutting $100K in outsourcing costs.",
        tools: ["YOLO", "CNN", "PyTorch"],
      },
      {
        title: "Internal Tools",
        description:
          "Engineered an internal computer vision tooling suite adopted company-wide, improving data labeling and model evaluation workflows.",
        tools: ["Python", "OpenCV", "Tooling"],
      },
    ],
  },
  {
    company: "MARS Lab",
    role: "Research Assistant",
    period: "May 2025 – May 2026",
    image: marsLab,
    items: [
      {
        title: "Pegasus — Hybrid Multimodal Robot",
        description:
          "Developed a hybrid walking-and-flying robotic platform, designing 10+ custom mechanical components. Formulated forward/inverse kinematics for quadruped locomotion and built an end-to-end Gazebo simulation pipeline. Implemented OctoMap-based 3D mapping, navigation, and obstacle avoidance via MAVROS.",
        tools: ["ROS", "Gazebo", "PX4/MAVROS", "OctoMap"],
      },
    ],
  },
  {
    company: "Ontario Tech RoboMaster",
    role: "Design Team Lead",
    period: "September 2024 – Present",
    image: arm,
    items: [
      {
        title: "Competition Robot Mechanical Design",
        description:
          "Directed the mechanical design of a 500+ component competition robot in SolidWorks, ensuring full DFM/DFA compliance. Managed CAD version control and design reviews, and mentored team members in mechanical design and GD&T.",
        tools: ["SolidWorks", "DFM/DFA", "GD&T"],
      },
    ],
  },
];

export const projects = [
  {
    name: "SensQ",
    subtitle: "Autonomous Mobile Robot Platform",
    period: "Jan 2026 – Present",
    image: amr,
    summary:
      "Built and deployed an autonomous mobile robot integrating physical hardware with ROS 2, using Nav2 and SLAM Toolbox for navigation, custom A* and Boustrophedon coverage planning, and AprilTag-based docking.",
    tools: ["ROS 2", "Nav2", "SLAM Toolbox", "AprilTag"],
  },
  {
    name: "Bolt Eye",
    subtitle: "Automated Inspection System",
    period: "Aug 2025 – Present",
    image: boltEye,
    summary:
      "Designed an automated conveyor system with custom optical inspection hardware. Deployed a real-time inspection pipeline detecting and classifying surface defects down to ≤2mm on active production lines with sub-100ms latency.",
    tools: ["YOLOv11", "Mask R-CNN", "DINOv2"],
  },
  {
    name: "6-DOF Robotic Arm",
    subtitle: "Simulation and Control in ROS",
    period: "May 2024 – Jan 2026",
    image: arm,
    summary:
      "Built a functional 6-DOF robotic arm with custom kinematics and L-BFGS-B path planning. Implemented Python and ROS/RViz tools for motion visualization and validation.",
    tools: ["ROS", "RViz", "Python", "L-BFGS-B"],
  },
];

export const awards = [
  { title: "Undergraduate Research Award", org: "Ontario Tech University" },
  { title: "STAR Award", org: "Ontario Tech University" },
  { title: "Merit Award", org: "Ontario Tech University" },
  { title: "President's List", org: "CGPA 4.25/4.3" },
];

export const contact = {
  linkedin: "https://www.linkedin.com/in/thonghuynh1/",
  email: "thonghuynh.0203@gmail.com",
  resume: "/Thong_Huynh_Resume.pdf",
};
