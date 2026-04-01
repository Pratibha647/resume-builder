import React, { useEffect, useRef, useState } from 'react'
import {useNavigate, useParams} from "react-router-dom"
import {LuArrowLeft, LuCircleAlert, LuDownload, LuPalette, LuSave, LuTrash2} from "react-icons/lu"
import toast from "react-hot-toast";
import DashboardLayout from '../../components/layouts/DashboardLayout';
import TitleInput from '../../components/Inputs/TitleInput';
import {useReactToPrint} from "react-to-print";
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';

export default function EditResume() {
  const {resumeId}=useParams();
  const navigate=useNavigate();

  const resumeRef=useRef(null);
  const resumeDownloadRef=useRef(null);

  const[baseWidth, setBaseWidth]=useState(800);

  const[openThemeSelector, setOpenThemeSelector]=useState(false);

  const[openPreviewModal, setOpenPreviewModal]=useState(false);

  const[currentPage, setCurrentPage]=useState("profile-info");
  const[progress, setProgress]=useState(0);
  const[resumeData, setResumeData]=useState({
    title:"",
    thumnailLink:"",
    profileInfo:{
      profileImg: null,
      profilePreviewUrl: "",
      fullname:"",
      designation:"",
      summary:"",
    },
    template:{
      theme:"",
      colorPalette:""
    },
    contactInfo:{
      email:"",
      phone:"",
      location:"",
      linkedin:"",
      github:"",
      website:"",
    },
    workExperience:[
      {
        company:"",
        role:"",
        startDate:"",  //e.g. "2022-01"
        endDate:"",   //e.g. "2023-12"
        description:""
      },
    ],
    education:[
      {
        degree:"",
        institution:"",
        startDate:"",
        endDate:"",
      },
    ],
    skills:[
      {
        name:"",
        progress:0, //percentage value(0-100)
      },
    ],
    projects:[
      {
        title:"",
        description:"",
        github:"",
        liveDemo:""
      },
    ],
    certifications:[
      {
        title:"",
        issue:"",
        year:""
      },
    ],
    languages:[
      {
        name:"",
        progress:0, //percentage value(0-100)
      },
    ],
    interests:[""],
  });
  const[errorMsg, setErrorMsg]=useState("");
  const[isLoading, setIsLoading]=useState(false);

  // Validate Inputs
  const validateAndNext=(e)=>{

  };

  // Function to navigate to the next page
  const goToNextStep=()=>{

  };

  // Function to navigate to the previous page
  const goBack=()=>{};

  // Update simple nested object (like profileInfo, contactInfo, etc)
  const updateSection=(section, key, value)=>{};

  // Update the array item (like workExperience[0], skills[1] etc.)
  const updateArrayItem = (section, index, key, value)=>{};

  // Add item to array
  const addArryaItem = (section, newItem)=>{};

  // Remove item from array
  const removeArrayItem =(section, index)=>{};

  // Fetch resume by ID
  const fetchResumeDetailsById = async()=>{
    try {
      const response=await axiosInstance.get(API_PATHS.RESUME.GET_BY_ID(resumeId));

      if(response.data && response.data.profileInfo){
        const resumeInfo = response.data;

        setResumeData((prevState)=>({
          ...prevState,
          title: resumeInfo?.title || "Untitled",
          template: resumeInfo?.template || prevState?.template,
          profileInfo: resumeInfo?.profileInfo || prevState?.profileInfo,
          contactInfo: resumeInfo?.contactInfo || prevState?.contactInfo,
          workExperience: resumeInfo?.workExperience || prevState?.workExperience,
          education: resumeInfo?.education || prevState?.education,
          skills: resumeInfo?.skills || prevState?.skills,
          projects: resumeInfo?.projects || prevState?.projects,
          certifications: resumeInfo?.certifications || prevState?.certifications,
          languages: resumeInfo?.languages || prevState?.languages,
          interests: resumeInfo?.interests || prevState?.interests,
        }));
      }
    } catch (error) {
      console.error("Error fetching resumes: ", error);
    }
  };

  // upload thumbnail and resume profile img
  const uploadResumeImages=async()=>{};

  const updateResumeDetails = async(thumbnailLink, profilePreviewUrl)=>{};

  // Delete Resume
  const handleDeleteResume = async()=>{};

  // download resume
  const reactToPrintFn = useReactToPrint({contentRef: resumeDownloadRef});

  // Function to update baseWidth based on the resume container size
  const updateBaseWidth = ()=>{

  };

  useEffect(()=>{
    updateBaseWidth();
    window.addEventListener("resize", updateBaseWidth);

    if(resumeId){
      fetchResumeDetailsById();
    }

    return ()=>{
      window.removeEventListener("resize", updateBaseWidth);
    };
  },[]);
  return <DashboardLayout>
    <div className='conatiner mx-auto'>
      <div className='flex items-center justify-between gap-5 bg-white rounded-lg border border-purple-100 py-3 px-4 mb-4'>
        <TitleInput
        title={resumeData.title}
        setTitle={(value)=>
          setResumeData((prevState)=>({
            ...prevState, 
            title:value,
          }))
        }
        />
      </div>
    </div>
  </DashboardLayout>

}
