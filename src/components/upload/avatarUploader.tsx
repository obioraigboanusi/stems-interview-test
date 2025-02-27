import React, { useState } from 'react';
import { FaCamera } from 'react-icons/fa';

interface AvatarUploaderProps {
  onUpload: (file: File, previewUrl: string) => void;
  imageUrl: string | null;
}

const AvatarUploader: React.FC<AvatarUploaderProps> = ({ onUpload, imageUrl }) => {
  const [avatarUrl, setAvatarUrl] = useState<string | null>(imageUrl);

  const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setAvatarUrl(previewUrl);
      onUpload(file, previewUrl);
    }
  };

  return (
    <div className='flex items-center justify-center'>
      <label className='relative cursor-pointer'>
        <input
          type='file'
          className='hidden'
          accept='image/*'
          onChange={handleUpload}
        />
        <div className='w-[100px] h-[100px] rounded-full overflow-hidden bg-primary'>
          {avatarUrl ? (
            <img
              src={avatarUrl}
              alt='Avatar Preview'
              className='object-cover w-full h-full'
            />
          ) : (
            <div className='flex flex-col items-center justify-center font-normal text-[13px] w-full h-full bg-primary text-white gap-1'>
              <p>Profile photo</p>

              <svg
                width='36'
                height='36'
                viewBox='0 0 36 36'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'>
                <path
                  d='M29.2162 30.6094C27.9061 28.8748 26.2111 27.4681 24.2647 26.5001C22.3183 25.5321 20.1738 25.0293 18 25.0313C15.8262 25.0293 13.6816 25.5321 11.7352 26.5001C9.78887 27.4681 8.09385 28.8748 6.78372 30.6094M29.2162 30.6094C31.7728 28.3354 33.5758 25.338 34.3897 22.0146C35.2036 18.6912 34.988 15.199 33.7715 12.001C32.555 8.80294 30.3951 6.05026 27.5782 4.10799C24.7613 2.16572 21.4206 1.12561 17.999 1.12561C14.5775 1.12561 11.2367 2.16572 8.41985 4.10799C5.60298 6.05026 3.44308 8.80294 2.22659 12.001C1.0101 15.199 0.794498 18.6912 1.60837 22.0146C2.42225 25.338 4.22715 28.3354 6.78372 30.6094M29.2162 30.6094C26.13 33.3623 22.1355 34.8809 18 34.8751C13.8638 34.8814 9.87041 33.3627 6.78372 30.6094M23.625 13.7813C23.625 15.2731 23.0323 16.7039 21.9774 17.7588C20.9225 18.8137 19.4918 19.4063 18 19.4063C16.5081 19.4063 15.0774 18.8137 14.0225 17.7588C12.9676 16.7039 12.375 15.2731 12.375 13.7813C12.375 12.2895 12.9676 10.8587 14.0225 9.80383C15.0774 8.74894 16.5081 8.15631 18 8.15631C19.4918 8.15631 20.9225 8.74894 21.9774 9.80383C23.0323 10.8587 23.625 12.2895 23.625 13.7813Z'
                  stroke='#F8F7FD'
                  stroke-width='1.5'
                  stroke-linecap='round'
                  stroke-linejoin='round'
                />
              </svg>
            </div>
          )}
        </div>
        <div className='absolute right-0 bottom-0 h-[32px] w-[32px] rounded-full bg-white text-[#6C5DD3] p-2'>
          <FaCamera />
        </div>
      </label>
    </div>
  );
};

export default AvatarUploader;
