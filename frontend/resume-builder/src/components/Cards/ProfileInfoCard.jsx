import React from 'react'
import { useContext } from 'react'
import { UserContext } from '../../context/userContext'
import { useNavigate } from 'react-router-dom'

export default function ProfileInfoCard() {
  const { user, clearUser } = useContext(UserContext)
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.clear()
    clearUser()
    navigate('/login')
  }

  return (
    user && (
      <div className="flex items-center gap-3">
        <img
          src={user.profileImageUrl}
          alt=""
          className="w-9 h-9 rounded-full object-cover"
          style={{ border: '1.5px solid var(--border-medium)' }}
        />
        <div>
          <div className="text-[14px] font-semibold" style={{ color: 'var(--text-heading)' }}>
            {user.name || ''}
          </div>
          <button
            className="text-[12px] font-medium transition-colors hover:underline"
            style={{ color: 'var(--text-muted)' }}
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
    )
  )
}
