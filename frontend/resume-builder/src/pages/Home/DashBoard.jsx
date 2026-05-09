import { useEffect, useState, useRef } from 'react';
import {useNavigate} from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import DashboardLayout from '../../components/layouts/DashboardLayout';
import {LuCirclePlus} from "react-icons/lu";
import moment from "moment";
import ResumeSummaryCard from '../../components/Cards/ResumeSummaryCard';
import CreateResumeForm from './CreateResumeForm';
import Modal from '../../components/Modal';
import { useStaggerReveal } from '../../animations/useGSAPAnimations';

export default function DashBoard() {
  const navigate=useNavigate();

  const[openCreateModal, setOpenCreateModal]=useState(false);
  const[allResumes, setAllResumes]=useState(null);
  const containerRef = useRef(null);

  useStaggerReveal(containerRef, ".resume-card", [allResumes]);

  const fetchAllResumes = async()=>{
    try{
      const response=await axiosInstance.get(API_PATHS.RESUME.GET_ALL);
      setAllResumes(response.data);
    }catch(error){
      console.error("Error fetching resumes: ", error);
    }
  };

  useEffect(()=>{
    fetchAllResumes();
  },[]);
  return <DashboardLayout>
    <div ref={containerRef} className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 pt-2 pb-8 px-4 md:px-0 relative z-10'>
      <div
      className='resume-card h-[280px] flex flex-col gap-4 items-center justify-center glassmorphism rounded-xl cursor-pointer transition-all duration-500 premium-shadow premium-hover card-glow group'
      style={{ border: '2px dashed rgba(147,40,231,0.35)' }}
      onClick={()=>setOpenCreateModal(true)}>
        <div className='w-12 h-12 flex items-center justify-center rounded-full group-hover:scale-110 transition-transform duration-500 shadow-sm icon-pulse'
             style={{ backgroundColor: 'rgba(147,40,231,0.08)', border: '1px solid rgba(147,40,231,0.15)' }}>
          <LuCirclePlus className="text-[22px]" style={{ color: '#9333ea' }}/>
        </div>
        <h3 className='font-semibold text-[15px] tracking-tight' style={{ color: 'var(--text-heading)' }}>Add New Resume</h3>
      </div>

      {allResumes === null ? (
        // Skeleton Loaders
        Array.from({ length: 4 }).map((_, idx) => (
          <div key={idx} className="resume-card h-[280px] rounded-xl overflow-hidden glassmorphism premium-shadow flex flex-col">
            <div className="h-[180px] skeleton-loading"></div>
            <div className="p-4 flex flex-col gap-2.5 flex-grow justify-center"
                 style={{ borderTop: '1px solid var(--border-light)' }}>
              <div className="h-3.5 w-2/3 skeleton-loading rounded-sm"></div>
              <div className="h-2.5 w-1/3 skeleton-loading rounded-sm mt-0.5 opacity-70"></div>
            </div>
          </div>
        ))
      ) : (
        allResumes.map((resume)=>(
          <div key={resume?._id} className="resume-card">
            <ResumeSummaryCard 
            imgUrl={resume?.thumbnailLink || null}
            title={resume.title}
            lastUpdated={
              resume?.updatedAt
              ? moment(resume.updatedAt).format("Do MM YYYY")
              : ""
            }
            onSelect={()=>navigate(`/resume/${resume?._id}`)}/>
          </div>
        ))
      )}
    </div>

    <Modal
      isOpen={openCreateModal}
      onClose={()=>{
        setOpenCreateModal(false);
      }}
      hideHeader
    >
      <div><CreateResumeForm/></div>
    </Modal>
  </DashboardLayout>;
}
