import React, { useEffect, useRef, useState } from 'react'
import {useNavigate, useParams} from "react-router-dom"
import {LuArrowLeft, LuCircleAlert, LuDownload, LuPalette, LuSave, LuTrash2} from "react-icons/lu"
import toast from "react-hot-toast";
import DashboardLayout from '../../components/layouts/DashboardLayout';
import TitleInput from '../../components/Inputs/TitleInput';
import {useReactToPrint} from "react-to-print";
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import StepProgress from '../../components/StepProgress';
import ProfileInfoForm from './Forms/ProfileInfoForm';
import ContactInfoForm from './Forms/ContactInfoForm';
import WorkExperienceForm from './Forms/WorkExperienceForm';
import EducationDeatailsForm from './Forms/EducationDeatailsForm';
import SkillsInfoForm from './Forms/SkillsInfoForm';

export default function EditResume() {
  const {resumeId}=useParams();
  const navigate=useNavigate();

  const resumeRef=useRef(null);
  const resumeDownloadRef=useRef(null);

  const[baseWidth, setBaseWidth]=useState(800);

  const[openThemeSelector, setOpenThemeSelector]=useState(false);

  const[openPreviewModal, setOpenPreviewModal]=useState(false);

  const[currentPage, setCurrentPage]=useState("skills");
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

  const renderForm = ()=>{
    switch(currentPage){
      case "profile-info":
        return(
          <ProfileInfoForm
          profileData={resumeData?.profileInfo}
          updateSection={(key,value)=>{
            updateSection("profileInfo", key, value);
          }}
          onNext={validateAndNext}
          />
        );
      
        case "contact-info":
          return(
          <ContactInfoForm
          contactInfo={resumeData?.contactInfo}
          updateSection={(key,value)=>{
            updateSection("contactInfo", key, value);
          }}/>
          );

        case "work-experince":
          return(
            <WorkExperienceForm
            workExperience={resumeData?.workExperience}
            updateArrayItem={(index, key, value)=>{
              updateArrayItem("workExperience", index, key, value);
            }}
            addArrayItem={(newItem)=>addArrayItem("workExperience", newItem)}
            removeArrayItem={(index)=>removeArrayItem("workExperience", index)}/>
          );

        case "education-info":
          return(
            <EducationDeatailsForm
            educationInfo={resumeData?.education}
            updateArrayItem={(index, key, value)=>{
              updateArrayItem("education", index, key, value);
            }}
            addArrayItem={(newItem)=>addArrayItem("education", newItem)}
            removeArrayItem={(index)=>removeArrayItem("education", index)}/>
          );

        case "skills":
          return(
            <SkillsInfoForm
            skillsInfo={resumeData.skills}
            updateArrayItem={(index, key, value)=>{
              updateArrayItem("skills", index, key, value);
            }}
            addArrayItem={(newItem)=>addArrayItem("skills", newItem)}
            removeArrayItem={(index)=>removeArrayItem("skills", index)}/>
          );
        
          default:
            return null
    }
  };

  // Update simple nested object (like profileInfo, contactInfo, etc)
  const updateSection=(section, key, value)=>{
    setResumeData((prev)=>({
      ...prev,
      [section]:{
        ...prev[section],
        [key]:value,
      },
    }));
  };

  // Update the array item (like workExperience[0], skills[1] etc.)
  const updateArrayItem = (section, index, key, value)=>{
    setResumeData((prev)=>{
      const updatedArray=[...prev[section]];

      if(key==null){
        updatedArray[index]=value;  //for simple strings linke `interests`
      }else{
        updatedArray[index]={
          ...updatedArray[index],
          [key]:value,
        };
      }

      return{
        ...prev,
        [section]:updatedArray,
      };
    });
  };

  // Add item to array
  const addArrayItem = (section, newItem)=>{
    setResumeData((prev)=>({
      ...prev,
      [section]:[...prev[section], newItem],
    }));
  };

  // Remove item from array
  const removeArrayItem =(section, index)=>{
    setResumeData((prev)=>{
      const updatedArray=[...prev[section]];
      updatedArray.splice(index,1);
      return{
        ...prev,
        [section]:updatedArray,
      };
    });
  };

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

        <div className='flex items-center gap-4'>
          <button className='btn-small-light p-2'
          onClick={()=>setOpenThemeSelector(true)}>
            <LuPalette className='text-[16px]'/>
            <span className='hidden md:block'>Change Theme</span>
          </button>

          <button 
          className='btn-small-light p-2'
          onClick={handleDeleteResume}>
            <LuTrash2 className='text-[16px]'/>
            <span className='hidden md:block'>Delete</span>
          </button>

          <button 
          className='btn-small-light p-2'
          onClick={()=>setOpenPreviewModal()}>
            <LuDownload className='text-[16px]'/>
            <span className='hidden md:block'>Preview & Download</span>
          </button>
        </div>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
        <div className='bg-white rounded-lg border border-purple-100 overflow-hidden'>
           
           <StepProgress progress={progress}/>

          {renderForm()}

          <div className='mx-5'>
            {errorMsg && (
              <div className='flex items-center gap-2 text-[11px] font-medium text-amber-600 bg-amber-100 px-2 py-0.5 my-1 rounded'>
                <LuCircleAlert className='text-md'/> {errorMsg}
              </div>
            )}

            <div className='flex items-end justify-end gap-3 mt-3 mb-5'>
              <button
              className='btn-small-light p-2'
              onClick={goBack}
              disabled={isLoading}>
                <LuArrowLeft className='text-[16px]'/>
                Back
              </button>
              <button
              className='btn-small-light p-2'
              onClick={uploadResumeImages}
              disabled={isLoading}>
                <LuSave className='text-[16px]'/>
                {isLoading ? "Updating..." : "Save & Exit"}
              </button>
              <button
              className='btn-small p-2'
              onClick={validateAndNext}
              disabled={isLoading}>
                {currentPage==="additionalInfo" && (
                  <LuDownload className='text-[16px]'/>
                )}
                {currentPage==="additionalInfo" ? "Preview & Download" : "Next"}
                {currentPage==="additionalInfo" && (
                  <LuArrowLeft className='text-[16px] rotate-180'/>
                )}
              </button>
            </div>
          </div>
        </div>

        <div ref={resumeRef} className='h-[100vh]'>
          {/* Resume Template */}
        </div>
      </div>
    </div>
  </DashboardLayout>

}
