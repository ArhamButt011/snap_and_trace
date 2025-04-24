import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import ClickOutside from '@/components/admin/ClickOutside'
import user from '/public/images/admin/dashboard/user.svg'
import { useAuth } from '@/context/AuthContext'
import { motion, AnimatePresence } from 'framer-motion'
import dltCircle from '/public/images/admin/allusers/dltCircle.svg'
import userImages from '/public/images/userImage.svg'
import Bell from '/public/images/admin/dashboard/Bell1.svg'
import Modal from '@/components/ui/Modal'
import { useNotification } from '@/context/NotificationContext'
import axios, { AxiosError } from 'axios'
import { showSwal } from '@/utils/swal'
import WarningIcon from '/public/images/user/warning.svg'
import EditIcon from '/public/images/editIcon.svg'
import { ClipLoader } from 'react-spinners'
import Button from '@/components/ui/Button'
import Text from '@/components/ui/Text'
import Label from '@/components/ui/Label'
import Input from '@/components/ui/Input'

const DropdownUser = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [isEditOpen, setIsEditOpen] = useState<boolean>(false)
  const [isDeleteOpen, setIsDeleteOpen] = useState<boolean>(false)
  const [passwordOpen, setPasswordOpen] = useState<boolean>(false)
  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [name, setName] = useState('')
  const [profileImage, setProfileImage] = useState(userImages)
  const [file, setFile] = useState<File | undefined>(undefined)
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const { isActive, toggleNotifications } = useNotification()
  const { logout, userData, setUserData } = useAuth()

  const handleLogoutClick = () => {
    setIsOpen(true)
  }

  const handleLogout = () => {
    logout()
    window.location.href = '/admin'
  }

  const onClose = () => {
    setIsOpen(false)
  }

  const handleImageClick = () => {
    fileInputRef.current?.click()
  }

  useEffect(() => {
    if (userData) {
      setName(userData.username || '')
      setProfileImage(userData.image || userImages)
    }
  }, [userData])

  const onEditClose = () => {
    setIsEditOpen(false)
  }

  const handleChangePassword = () => {
    setPasswordOpen(true)
    console.log(passwordOpen)
  }

  const onPasswordClose = () => {
    setPasswordOpen(false)
  }

  const handleEditClick = () => {
    setIsEditOpen(true)
  }

  const handleUpdatePassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    try {
      if (newPassword !== confirmPassword) {
        showSwal({
          title: 'Error!',
          text: 'The New Password and Confirm Password do not match.',
          icon: 'error',
        })
        return
      }

      const id = userData?.id
      const response = await axios.put('/api/admin/change-password', {
        id,
        oldPassword,
        newPassword,
      })

      if (response.data.error) {
        showSwal({
          title: 'Error!',
          text: response.data.error ?? 'An unknown error occurred',
          icon: 'error',
        })
      } else {
        showSwal({
          title: 'Success',
          text: 'Password Update Successfully',
          icon: 'success',
        })

        onPasswordClose()
        setOldPassword('')
        setNewPassword('')
        setConfirmPassword('')
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log('api error', error.response?.data?.error)

        showSwal({
          title: 'Error!',
          text: error.response?.data?.error ?? 'An unknown error occurred',
          icon: 'error',
        })
      }
    } finally {
      setLoading(false)
    }
  }


  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const profileImage = e.target.files?.[0]
    if (profileImage) {
      setFile(profileImage)
      const imageUrl = URL.createObjectURL(profileImage)
      setProfileImage(imageUrl)
    }
  }

  const handleSubmit1 = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!userData) {
      showSwal({
        title: 'Error!',
        text: 'User id not found',
        icon: 'error',
      })
      return
    }
    const id = userData.id

    const formData = new FormData()
    if (file) {
      formData.append('file', file)
    }
    formData.append('name', name)
    formData.append('id', id)
    setLoading(true)

    try {
      const response = await fetch('/api/admin/edit-profile', {
        method: 'PUT',
        body: formData,
      })

      const data = await response.json()
      console.log('edit data->', data)

      if (data.status === 'success') {
        const newToken = data?.token
        if (newToken) {
          localStorage.setItem('token', newToken)
        }

        setUserData((prevData) => ({
          ...prevData,
          id: prevData?.id || '',
          name: prevData?.username || '',
          email: prevData?.email || '',
          role: prevData?.role || '',
          username: data.data.username,
          image: data.data.image,
        }))

        showSwal({
          title: 'Success',
          text: 'Data Updated Successfully',
          icon: 'success',
        })
        setName('')
        setProfileImage(userImages)
      } else {

        showSwal({
          title: 'Error!',
          text: 'File upload failed!',
          icon: 'error',
        })
      }
    } catch (error) {
      console.error('Error:', error)

      showSwal({
        title: 'Error!',
        text: 'An error occurred during file upload.',
        icon: 'error',
      })
    } finally {
      setLoading(false)
      setIsEditOpen(false)
    }
  }

  const handleDelete = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/user/DeleteUser', {
        method: 'DELETE',
        body: JSON.stringify({ id: userData?.id }),
      })
      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.message || 'Error Deleting user')
      }
      setIsDeleteOpen(false)
      handleLogoutClick()
    } catch (err) {

      showSwal({
        title: 'Error!',
        text: err instanceof Error ? err.message : String(err),
        icon: 'error',
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <ClickOutside onClick={() => setDropdownOpen(false)} className="relative">
        <Link
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="flex items-center gap-4"
          href="#"
        >
          <span className="text-left">
            <span className="block text-[20px] font-medium text-white">
              {userData?.username}
            </span>
          </span>

          {userData?.image ? (
            <div className="w-[44px] h-[44px] rounded-full overflow-hidden flex-shrink-0">
              <Image
                width={44}
                height={44}
                src={userData?.image ?? user}
                className="w-full h-full object-cover"
                alt="User"
              />
            </div>
          ) : (
            <div className="w-[44px] h-[44px] text-[26.86px] flex items-center justify-center bg-[#F2F2F2] rounded-full text-[#266CA8] font-bold">
              {userData?.username?.charAt(0).toUpperCase()}
            </div>
          )}

          <svg
            style={{
              transform: dropdownOpen ? 'rotate(360deg)' : 'rotate(270deg)',
            }}
            className="hidden fill-current sm:block transition-transform duration-300"
            width="12"
            height="14"
            viewBox="0 0 12 8"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M0.410765 0.910734C0.736202 0.585297 1.26384 0.585297 1.58928 0.910734L6.00002 5.32148L10.4108 0.910734C10.7362 0.585297 11.2638 0.585297 11.5893 0.910734C11.9147 1.23617 11.9147 1.76381 11.5893 2.08924L6.58928 7.08924C6.26384 7.41468 5.7362 7.41468 5.41077 7.08924L0.410765 2.08924C0.0853277 1.76381 0.0853277 1.23617 0.410765 0.910734Z"
              fill="#A8E543"
            />
          </svg>
        </Link>
        
        {/* <!-- Dropdown Start --> */}
        <AnimatePresence>
          {dropdownOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{
                type: 'spring',
                stiffness: 300,
                damping: 20,
                duration: 0.4,
              }}
              className="absolute right-0 mt-4 flex w-72 flex-col rounded-sm bg-[#2B2B31] shadow-default"
            >
              <div className=" flex justify-center flex-col items-center py-3">
                <span className="w-[55px] h-[55px] rounded-full text-center">
                 {userData?.image ? ( 
                  <Image
                    width={35}
                    height={35}
                    className="w-full h-full rounded-full object-cover"
                    src={userData?.image ?? user}
                    alt="User"
                  />
                   ) : (
                    <div className="w-[55px] h-[55px] flex items-center justify-center bg-[#F2F2F2] rounded-full text-[#266CA8] font-semibold text-[38px]">
                      {userData?.username?.charAt(0).toUpperCase()}
                    </div>
                  )} 
                </span>
                <span className="text-center lg:block mt-3">
                  <span className="block  text-[20px] font-semibold text-white">
                    {userData?.username}
                  </span>
                  <span className="block text-center text-base font-normal text-[#FFFFFF99]">
                    {userData?.email}
                  </span>
                </span>
              </div>
              <ul className="flex flex-col border-t border-[#FFFFFF1A] gap-4 px-5 py-5">
                <li>
                  <Link
                    href="#"
                    className="flex items-center gap-2 text-[14px] font-medium duration-300 ease-in-out hover:text-[#A8E543] lg:text-base cursor-pointer"
                    onClick={handleEditClick}
                  >
                    <svg
                      width="27"
                      height="27"
                      viewBox="0 0 27 27"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M5.60938 22.4318C5.60938 22.0601 5.91067 21.7589 6.28233 21.7589H20.6387C21.0104 21.7589 21.3116 22.0601 21.3116 22.4318C21.3116 22.8035 21.0104 23.1048 20.6387 23.1048H6.28233C5.91067 23.1048 5.60938 22.8035 5.60938 22.4318Z"
                        fill="#FFFFFF99"
                      />
                      <path
                        d="M12.179 16.8867C12.4074 16.7086 12.6145 16.5014 13.0288 16.0871L18.3377 10.7783C17.6152 10.4775 16.7594 9.98356 15.95 9.1742C15.1405 8.36472 14.6465 7.50879 14.3458 6.78618L9.03683 12.0952L9.0368 12.0952C8.62253 12.5095 8.41538 12.7166 8.23723 12.945C8.02708 13.2144 7.84691 13.506 7.6999 13.8144C7.57528 14.0759 7.48265 14.3538 7.29737 14.9097L6.32033 17.8408C6.22916 18.1143 6.30035 18.4159 6.50423 18.6198C6.70811 18.8236 7.00968 18.8948 7.28321 18.8036L10.2143 17.8266C10.7701 17.6413 11.0481 17.5487 11.3095 17.4241C11.618 17.2771 11.9095 17.0969 12.179 16.8867Z"
                        fill="#FFFFFF99"
                      />
                      <path
                        d="M19.8108 9.30512C20.9132 8.20276 20.9132 6.41549 19.8108 5.31313C18.7085 4.21077 16.9212 4.21077 15.8189 5.31313L15.1821 5.94986C15.1908 5.97619 15.1999 6.00289 15.2093 6.02993C15.4427 6.70262 15.883 7.58447 16.7114 8.41284C17.5397 9.24122 18.4216 9.68156 19.0943 9.91495C19.1212 9.92429 19.1478 9.93329 19.174 9.94197L19.8108 9.30512Z"
                        fill="#FFFFFF99"
                      />
                    </svg>
                    Edit Profile
                  </Link>
                </li>
                <li
                  className="flex items-center gap-2 text-sm font-medium duration-300 ease-in-out hover:text-[#A8E543] lg:text-base cursor-pointer"
                  onClick={handleChangePassword}
                >
                  <svg
                    width="27"
                    height="28"
                    viewBox="0 0 27 28"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M7.40246 12.334V10.4905C7.40246 7.14549 10.1141 4.43386 13.4591 4.43386C16.804 4.43386 19.5156 7.14549 19.5156 10.4905V12.334C20.5159 12.4087 21.1672 12.5973 21.6434 13.0734C22.4318 13.8618 22.4318 15.1308 22.4318 17.6686C22.4318 20.2065 22.4318 21.4754 21.6434 22.2639C20.855 23.0523 19.586 23.0523 17.0481 23.0523H9.86996C7.33209 23.0523 6.06316 23.0523 5.27474 22.2639C4.48633 21.4754 4.48633 20.2065 4.48633 17.6686C4.48633 15.1308 4.48633 13.8618 5.27474 13.0734C5.75086 12.5973 6.40223 12.4087 7.40246 12.334ZM8.74837 10.4905C8.74837 7.88881 10.8574 5.77977 13.4591 5.77977C16.0607 5.77977 18.1697 7.88881 18.1697 10.4905V12.2882C17.8261 12.285 17.4533 12.285 17.0481 12.285H9.86996C9.46483 12.285 9.09204 12.285 8.74837 12.2882V10.4905Z"
                      fill="#FFFFFF99"
                    />
                  </svg>
                  Change Password
                </li>
                <li>
                  <div className="flex items-center justify-between gap-2 text-sm font-medium duration-300 ease-in-out lg:text-base">
                    <div className="flex items-center gap-2">
                    
                      <Image width={29} height={30} src={Bell} alt="bell" style={{ width: "auto", height: "auto" }} />
                      Enable Notifications
                    </div>
                    <label className="inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        value=""
                        className="sr-only peer"
                        checked={isActive}
                        onChange={toggleNotifications}
                      />
                      <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-[#A8E543] dark:peer-checked:bg-[#A8E543]"></div>
                    </label>
                  </div>
                </li>
                <li>
                  <Link
                    href="#"
                    onClick={handleLogoutClick}
                    className="flex items-center gap-2 text-sm font-medium duration-300 ease-in-out hover:text-[#A8E543] lg:text-base"
                  >
                    <svg
                      width="27"
                      height="28"
                      viewBox="0 0 27 28"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M17.5006 13.4442C17.64 13.5717 17.7194 13.752 17.7194 13.9409C17.7194 14.1298 17.64 14.3101 17.5006 14.4376L13.575 18.0267C13.3007 18.2774 12.875 18.2584 12.6243 17.9841C12.3735 17.7098 12.3925 17.2841 12.6668 17.0333L15.3131 14.6139L5.38194 14.6139C5.01028 14.6139 4.70898 14.3126 4.70898 13.9409C4.70898 13.5692 5.01028 13.2679 5.38194 13.2679L15.3131 13.2679L12.6668 10.8485C12.3925 10.5977 12.3735 10.172 12.6243 9.89772C12.875 9.62343 13.3007 9.60437 13.575 9.85515L17.5006 13.4442Z"
                        fill="#A8E543"
                      />
                      <path
                        d="M16.1492 21.3434C15.7775 21.3434 15.4763 21.6447 15.4763 22.0164C15.4763 22.388 15.7775 22.6893 16.1492 22.6893L16.1985 22.6893C17.4255 22.6893 18.4146 22.6893 19.1925 22.5848C20.0002 22.4762 20.6802 22.2439 21.2203 21.7038C21.7604 21.1637 21.9927 20.4837 22.1012 19.676C22.2058 18.8981 22.2058 17.9091 22.2058 16.682L22.2058 11.1999C22.2058 9.97275 22.2058 8.98367 22.1012 8.20576C21.9927 7.39812 21.7604 6.7181 21.2203 6.17801C20.6802 5.63793 20.0002 5.40563 19.1925 5.29705C18.4146 5.19246 17.4255 5.19248 16.1984 5.19249L16.1492 5.19249C15.7775 5.19249 15.4763 5.49379 15.4763 5.86545C15.4763 6.23711 15.7775 6.5384 16.1492 6.5384C17.4372 6.5384 18.3354 6.53983 19.0132 6.63096C19.6716 6.71947 20.0203 6.88138 20.2686 7.12972C20.5169 7.37805 20.6788 7.7267 20.7673 8.3851C20.8585 9.06285 20.8599 9.96113 20.8599 11.2491L20.8599 16.6327C20.8599 17.9207 20.8585 18.819 20.7673 19.4967C20.6788 20.1551 20.5169 20.5038 20.2686 20.7521C20.0203 21.0004 19.6716 21.1623 19.0132 21.2509C18.3354 21.342 17.4372 21.3434 16.1492 21.3434Z"
                        fill="#A8E543"
                      />
                    </svg>
                    Logout
                  </Link>
                </li>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </ClickOutside>
      {/* edit profile */}
      <Modal isOpen={isEditOpen} onClose={onEditClose} buttonContent="">
        <form onSubmit={handleSubmit1}>
          {loading && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[100000]">
              <ClipLoader color="#A8E543" size={50} />
            </div>
          )}
          <div className="flex items-center flex-col gap-3 justify-start">
            <div className="flex justify-start items-center w-full mb-4">
              <Text
                as="h3"
                className="text-white font-semibold text-start flex-grow"
              >
                Edit Profile
              </Text>
            </div>
            <div className="flex justify-start w-full">
              <div className='relative cursor-pointer'>
                <Image
                  src={profileImage}
                  alt="userImage"
                  className="rounded-full w-36 h-36 object-cover "
                  onClick={handleImageClick}
                  width={200}
                  height={200}
                />
                <Image
                  src={EditIcon}
                  alt="editImage"
                  className="absolute top-0 right-0 transform w-[40px] h-[40px]"
                  onClick={handleImageClick}
                />
                <input
                  type="file"
                  ref={fileInputRef}
                  accept=".jpg, .jpeg, .png"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </div>
            </div>
            <div className="w-full mt-4">
              <Label htmlFor="username">Username</Label>
              <Input
                id="password"
                type="text"
                value={name}
                placeholder="Enter Username"
                onChange={(e) => setName(e.target.value)}
                withIcon
                name=''
                readOnly={true}
                className="bg-[#FFFFFF1A] border-none text-white placeholder-[#FFFFFF80] rounded-[43.81px]"
              />
            </div>

            <div className='w-full'>
              <div className="flex gap-3 mt-8 w-full max-w-xs justify-start">
                <Button className='bg-[#FFFFFF1A] text-white' onClick={() => onEditClose()}>
                  Cancel
                </Button>
                <Button type="submit">
                  Update
                </Button>
              </div>
            </div>

          </div>
        </form>
      </Modal>

      {/* change password */}
      <Modal isOpen={passwordOpen} onClose={onPasswordClose} buttonContent="">
        <div className="flex flex-col gap-4">
          {loading && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[100000]">
              <ClipLoader color="#A8E543" size={50} />
            </div>
          )}
          <div className="flex justify-start items-center w-full mb-7">
            <Text as="h3" className="text-white text-start flex-grow">
              Change Password
            </Text>
          </div>
          <form onSubmit={handleUpdatePassword}>
            <div className="mb-2">
              <Label htmlFor="oldPassword">Old Password</Label>
              <Input
                id="password"
                type="password"
                value={oldPassword}
                placeholder="Enter Old Password"
                onChange={(e) => setOldPassword(e.target.value)}
                withIcon
                name=''
                readOnly={true}
                className="bg-[#FFFFFF1A] border-none text-white placeholder-[#FFFFFF80] rounded-[43.81px]"
              />
            </div>

            <div className="mb-2">
              <Label htmlFor="oldPassword">New Password</Label>
              <Input
                id="password"
                type="password"
                value={newPassword}
                placeholder="Enter New Password"
                onChange={(e) => setNewPassword(e.target.value)}
                withIcon
                name=''
                readOnly={true}
                className="bg-[#FFFFFF1A] border-none text-white placeholder-[#FFFFFF80] rounded-[43.81px]"
              />
            </div>

            <div className="mb-2">
              <Label htmlFor="oldPassword">Confirm New Password</Label>
              <Input
                id="password"
                type="password"
                value={confirmPassword}
                placeholder="Enter Confirm Password"
                onChange={(e) => setConfirmPassword(e.target.value)}
                withIcon
                name=''
                readOnly={true}
                className="bg-[#FFFFFF1A] border-none text-white placeholder-[#FFFFFF80] rounded-[43.81px]"
              />
            </div>
            <div className="flex gap-3 mt-8 w-full max-w-xs">
              <Button className='bg-[#FFFFFF1A] text-white' onClick={() => onPasswordClose()}>
                Cancel
              </Button>
              <Button type="submit">
                Update
              </Button>
            </div>
          </form>
        </div>
      </Modal>
      {/* delete */}
      <Modal isOpen={isDeleteOpen} onClose={onEditClose} buttonContent="">
        <div className="flex items-center flex-col gap-8">
          {loading && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[100000]">
              <ClipLoader color="#A8E543" size={50} />
            </div>
          )}
          <div className="relative flex flex-col items-center">
            <Image
              src={WarningIcon}
              alt="userImage"
              className="rounded-full w-30 h-30 object-cover"
              onClick={handleImageClick}
              width={200}
              height={200}
            />
            <Text
              as="h3"
              className="text-[#000000] font-semibold text-center flex-grow"
            >
              <span className="text-[#266CA8]">Delete</span> Your Account?
            </Text>

            <Text className="text-center text-[#777777]">
              Are you sure you want to delete your account? All your downloaded
              files and subscription data will be lost
            </Text>
          </div>

          <div className="w-full flex gap-10 max-w-sm">
            
            <Button onClick={() => setIsDeleteOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleDelete}>Yes I&apos;m Sure</Button>
          </div>
        </div>
      </Modal>

      {/* Account logout Modal */}
      <Modal isOpen={isOpen} onClose={onClose} buttonContent="">
        <div className="flex items-center flex-col">
          <Image src={dltCircle} alt="dltCircle" className="" />
          <Text as="h3" className="text-white font-medium mt-2">
            Logout
          </Text>
          <Text as='p' className="font-medium text-primary">
            Are you sure you want to Logout to your account
          </Text>
          <div className="flex gap-3 mt-8 w-full max-w-xs">
            <Button className='bg-[#FFFFFF1A] text-white' onClick={() => onClose()}>
              Cancel
            </Button>
            <Button onClick={handleLogout}>Yes, Logout</Button>
          </div>
        </div>
      </Modal>
    </>
  )
}

export default DropdownUser
