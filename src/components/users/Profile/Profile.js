import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { userProfile } from '../../../context/slice/user/userSlice'

const Profile = () => {
  const dispatch = useDispatch()
  const { user } = useSelector(store => store.users)
  useEffect(()=>{
    dispatch(userProfile(user.user.id))
  }, [dispatch])
  return (
    <div>Profile</div>
  )
}

export default Profile