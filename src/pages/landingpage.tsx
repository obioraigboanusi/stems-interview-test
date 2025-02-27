import React, { useState    } from 'react';
import Image from 'next/image';

const LandingPage: React.FC = () => {
    const [url, setUrl] = useState('');
    const [activeSection, setActiveSection] = useState('create');

    // Function to change the active section
    const handleSectionChange = (section: string) => {
        setActiveSection(section);
    };

    const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace('0xstems.xyz/', '');
        setUrl(value);
    };
    const scrollToSection = (id: string) => {
        const section = document.getElementById(id);
          if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
          }
      };

  return (
    <div className="h-screen w-full bg-gradient-to-b from-[#1D1D16] to-indigo-400">
      <header className=" text-white p-4 flex justify-between items-center">
        <h1 className="text-xl">
        <Image src="/assets/Logo.svg" alt="Stems Logo" width={150} height={150} />
        </h1>
        <nav className="flex-grow flex justify-center space-x-4">
          {/* <a href="#how-it-works" className="ml-4 hover:text-primary">How it works</a>
          <a href="#contact" className="ml-4 hover:text-primary">Contact</a> */}
          {/* <a href="#go-to-app" className="ml-4 hover:text-primary">Go to app</a> */}
        </nav>
        <div>
            <a href="#login" className="mr-4 hover:text-primary">Log in</a>
            <div className="w-30 h-12 px-7 py-3 bg-slate-50 hover:bg-indigo-400 rounded-3xl shadow flex-col justify-start items-start gap-2 inline-flex">
                <div className="justify-start items-start gap-12 inline-flex">
                    <div className="text-black text-lg font-medium font-['PP Pangram Sans']">Sign up</div>
                </div>
            </div>
        </div>
      </header>

      <main className="flex-grow p-8 text-center">
        <section id="intro" className="min-h-screen w-full py-24 ">
          <h2 className="text-4xl sm:text-8xl font-bold">
          Receive <span className="text-primary">beats</span> from anyone, all <span className="text-primary">in one place</span>.
          </h2>
          <h3 className="text-xl sm:text-3xl font-bold mt-4">Set up your page to source and review beats</h3>
          <div className="flex justify-center items-center space-x-4">
            <div className="relative flex items-center z-10">
                <span className="absolute py-3 sm:pr-6 pt-7 left-2 sm:left-7 text-black">0xStems.xyz/</span>
                <input type="text" placeholder="yourname" value={url} onChange={handleUrlChange} className=" bg-white text-black py-3 pl-28 sm:pl-32 pr-2 sm:pr-6 rounded-lg w-full mt-4" />
            </div>
            <button className="z-10 text-xs sm:text-xl bg-black hover:bg-gray-800 text-white py-3 px-6 rounded-lg mt-4">Claim your URL</button>
          </div>
          <div className=" w-120px sm:w-full h-24 sm:h-48 mt-[-30px] sm:mt-[-70px] ml-[-30px] sm:ml-0 mr-[-30px] sm:mr-0 relative">
            <Image src="/assets/images/login/visualizer.png" alt="visualizer" layout="fill" objectFit="cover" />
          </div>
          <div className="mt-12 cursor-pointer z-50" onClick={() => scrollToSection('setup')}>
            <span className="text-4xl text-white animate-bounce">↓</span>
          </div>
        </section>

        <section id="setup" className=" h-screen my-12">
          {/* <div className="w-96 h-80 relative">
            <div className="opacity-80 w-36 h-48 left-[32px] top-[193px] absolute">
                <img className="w-36 h-48 left-0 top-0 absolute rounded-md" src="https://via.placeholder.com/143x186" />
                <div className="w-20 h-3 left-[14px] top-[54px] absolute" />
            </div>
            <div className="px-6 py-2.5 left-[28px] top-[148px] absolute bg-gradient-to-r from-indigo-400 to-indigo-400 rounded-3xl shadow justify-center items-center gap-2.5 inline-flex">
                <div className="text-slate-50 text-sm font-medium font-['PP Pangram Sans']">Create your page now</div>
            </div>
            <div className="w-72 left-[28px] top-[107px] absolute text-slate-50 text-xs font-medium font-['PP Pangram Sans']">Showcase your vibe, connect your socials, and specify your needs.</div>
            <div className="w-72 left-[28px] top-[50px] absolute"><span style={{color: 'text-indigo-400', fontSize: '2xl', fontWeight: 'bold', fontFamily: 'PP Pangram Sans'}}>Create</span><span style={{ color: 'text-slate-50', fontSize: '2xl', fontWeight: 'bold', fontFamily: 'PP Pangram Sans'}}> your page in minutes </span></div>
            <div className="w-96 left-[8px] top-0 absolute">
                <div className="w-20 h-7 px-3 py-2 left-[271px] top-0 absolute bg-slate-50/opacity-20 rounded-lg shadow justify-start items-center gap-96 inline-flex">
                <div className="text-slate-50 text-xs font-semibold font-['PP Pangram Sans']">Permission</div>
                </div>
                <div className="w-20 h-7 px-3 py-2 left-[181px] top-0 absolute bg-slate-50/opacity-20 rounded-lg shadow justify-start items-center gap-96 inline-flex">
                <div className="grow shrink basis-0 text-center text-slate-50 text-xs font-semibold font-['PP Pangram Sans']">Review</div>
                </div>
                <div className="w-20 h-7 px-6 py-2 left-[91px] top-0 absolute bg-slate-50/opacity-20 rounded-lg shadow justify-start items-center gap-96 inline-flex">
                <div className="grow shrink basis-0 text-center text-slate-50 text-xs font-semibold font-['PP Pangram Sans']">Share</div>
                </div>
                <div className="w-20 h-7 px-6 py-2 left-0 top-0 absolute bg-slate-50 rounded-lg shadow justify-start items-center gap-96 inline-flex">
                <div className="grow shrink basis-0 text-center text-black text-xs font-semibold font-['PP Pangram Sans']">Create</div>
                </div>
            </div>
            <div className="w-64 h-24 left-[118px] top-[231px] absolute">
                <div className="w-48 h-14 left-[38px] top-0 absolute bg-indigo-950 rounded shadow" />
                <img className="w-48 h-14 left-[38px] top-0 absolute shadow" src="https://via.placeholder.com/198x56" />
                <img className="w-9 h-1 left-[118px] top-[38px] absolute" src="https://via.placeholder.com/35x5" />
                <div className="w-16 h-6 left-[200px] top-[43px] absolute">
                <div className="w-16 h-2 left-0 top-0 absolute text-slate-50 text-xs font-medium font-['PP Pangram Sans']">Collaborators</div>
                <div className="w-12 h-3.5 px-4 py-2 left-0 top-[10px] absolute bg-slate-50 rounded-3xl justify-center items-center gap-0.5 inline-flex">
                    <div className="text-indigo-500 text-xs font-medium font-['PP Pangram Sans']">Producer #1</div>
                    <div className="w-2 h-2 relative opacity-60" />
                </div>
                </div>
                <div className="w-12 h-3.5 px-4 py-2 left-[207px] top-[74px] absolute bg-slate-50 rounded-3xl shadow justify-center items-center gap-0.5 inline-flex">
                <div className="text-indigo-500 text-xs font-medium font-['PP Pangram Sans']">Producer #2</div>
                <div className="w-2 h-2 relative opacity-60" />
                </div>
                <div className="w-48 h-8 p-4 left-0 top-[45px] absolute bg-slate-50 rounded shadow flex-col justify-center items-center gap-4 inline-flex">
                <div className="w-48 h-7 relative">
                    <div className="w-40 h-2.5 left-[30.50px] top-[8.35px] absolute">
                    <div className="w-1 h-px left-0 top-[2.89px] absolute origin-top-left rotate-90 border-2 border-indigo-500"></div>
                    <div className="w-1 h-px left-[79.43px] top-[2.89px] absolute origin-top-left rotate-90 border-2 border-slate-950/opacity-50"></div>
                    <div className="w-1 h-px left-[39.72px] top-[2.89px] absolute origin-top-left rotate-90 border-2 border-slate-950/opacity-50"></div>
                    <div className="w-1 h-px left-[119.15px] top-[2.89px] absolute origin-top-left rotate-90 border-2 border-slate-950/opacity-50"></div>
                    <div className="w-1 h-px left-[19.86px] top-[2.89px] absolute origin-top-left rotate-90 border-2 border-indigo-500"></div>
                    <div className="w-1 h-px left-[99.29px] top-[2.89px] absolute origin-top-left rotate-90 border-2 border-slate-950/opacity-50"></div>
                    <div className="w-1 h-px left-[59.57px] top-[2.89px] absolute origin-top-left rotate-90 border-2 border-slate-950/opacity-50"></div>
                    <div className="w-1 h-px left-[139.01px] top-[2.89px] absolute origin-top-left rotate-90 border-2 border-slate-950/opacity-50"></div>
                    <div className="w-1.5 h-px left-[9.93px] top-[1.73px] absolute origin-top-left rotate-90 border-2 border-indigo-500"></div>
                    <div className="w-1.5 h-px left-[89.36px] top-[1.73px] absolute origin-top-left rotate-90 border-2 border-slate-950/opacity-50"></div>
                    <div className="w-1.5 h-px left-[49.65px] top-[1.73px] absolute origin-top-left rotate-90 border-2 border-slate-950/opacity-50"></div>
                    <div className="w-1.5 h-px left-[129.08px] top-[1.73px] absolute origin-top-left rotate-90 border-2 border-slate-950/opacity-50"></div>
                    <div className="w-1.5 h-px left-[29.79px] top-[1.73px] absolute origin-top-left rotate-90 border-2 border-slate-950/opacity-50"></div>
                    <div className="w-1.5 h-px left-[109.22px] top-[1.73px] absolute origin-top-left rotate-90 border-2 border-slate-950/opacity-50"></div>
                    <div className="w-1.5 h-px left-[69.50px] top-[1.73px] absolute origin-top-left rotate-90 border-2 border-slate-950/opacity-50"></div>
                    <div className="w-1.5 h-px left-[148.93px] top-[1.73px] absolute origin-top-left rotate-90 border-2 border-slate-950/opacity-50"></div>
                    <div className="w-0.5 h-px left-[6.62px] top-[3.46px] absolute origin-top-left rotate-90 border-2 border-indigo-500"></div>
                    <div className="w-0.5 h-px left-[86.05px] top-[3.46px] absolute origin-top-left rotate-90 border-2 border-slate-950/opacity-50"></div>
                    <div className="w-0.5 h-px left-[46.33px] top-[3.46px] absolute origin-top-left rotate-90 border-2 border-slate-950/opacity-50"></div>
                    <div className="w-0.5 h-px left-[125.77px] top-[3.46px] absolute origin-top-left rotate-90 border-2 border-slate-950/opacity-50"></div>
                    <div className="w-0.5 h-px left-[26.48px] top-[3.46px] absolute origin-top-left rotate-90 border-2 border-slate-950/opacity-50"></div>
                    <div className="w-0.5 h-px left-[105.91px] top-[3.46px] absolute origin-top-left rotate-90 border-2 border-slate-950/opacity-50"></div>
                    <div className="w-0.5 h-px left-[66.19px] top-[3.46px] absolute origin-top-left rotate-90 border-2 border-slate-950/opacity-50"></div>
                    <div className="w-0.5 h-px left-[145.62px] top-[3.46px] absolute origin-top-left rotate-90 border-2 border-slate-950/opacity-50"></div>
                    <div className="w-2.5 h-px left-[16.55px] top-[0.29px] absolute origin-top-left rotate-90 border-2 border-indigo-500"></div>
                    <div className="w-2.5 h-px left-[95.98px] top-[0.29px] absolute origin-top-left rotate-90 border-2 border-slate-950/opacity-50"></div>
                    <div className="w-2.5 h-px left-[56.26px] top-[0.29px] absolute origin-top-left rotate-90 border-2 border-slate-950/opacity-50"></div>
                    <div className="w-2.5 h-px left-[135.70px] top-[0.29px] absolute origin-top-left rotate-90 border-2 border-slate-950/opacity-50"></div>
                    <div className="w-2.5 h-px left-[36.41px] top-[0.29px] absolute origin-top-left rotate-90 border-2 border-slate-950/opacity-50"></div>
                    <div className="w-2.5 h-px left-[115.84px] top-[0.29px] absolute origin-top-left rotate-90 border-2 border-slate-950/opacity-50"></div>
                    <div className="w-2.5 h-px left-[76.12px] top-[0.29px] absolute origin-top-left rotate-90 border-2 border-slate-950/opacity-50"></div>
                    <div className="w-2.5 h-px left-[3.31px] top-0 absolute origin-top-left rotate-90 border-2 border-indigo-500"></div>
                    <div className="w-2.5 h-px left-[82.74px] top-0 absolute origin-top-left rotate-90 border-2 border-slate-950/opacity-50"></div>
                    <div className="w-2.5 h-px left-[43.03px] top-0 absolute origin-top-left rotate-90 border-2 border-slate-950/opacity-50"></div>
                    <div className="w-2.5 h-px left-[122.46px] top-0 absolute origin-top-left rotate-90 border-2 border-slate-950/opacity-50"></div>
                    <div className="w-2.5 h-px left-[23.17px] top-0 absolute origin-top-left rotate-90 border-2 border-indigo-500"></div>
                    <div className="w-2.5 h-px left-[102.60px] top-0 absolute origin-top-left rotate-90 border-2 border-slate-950/opacity-50"></div>
                    <div className="w-2.5 h-px left-[62.88px] top-0 absolute origin-top-left rotate-90 border-2 border-slate-950/opacity-50"></div>
                    <div className="w-2.5 h-px left-[142.31px] top-0 absolute origin-top-left rotate-90 border-2 border-slate-950/opacity-50"></div>
                    <div className="w-2.5 h-px left-[13.24px] top-0 absolute origin-top-left rotate-90 border-2 border-indigo-500"></div>
                    <div className="w-2.5 h-px left-[92.67px] top-0 absolute origin-top-left rotate-90 border-2 border-slate-950/opacity-50"></div>
                    <div className="w-2.5 h-px left-[52.95px] top-0 absolute origin-top-left rotate-90 border-2 border-slate-950/opacity-50"></div>
                    <div className="w-2.5 h-px left-[132.39px] top-0 absolute origin-top-left rotate-90 border-2 border-slate-950/opacity-50"></div>
                    <div className="w-2.5 h-px left-[33.10px] top-0 absolute origin-top-left rotate-90 border-2 border-slate-950/opacity-50"></div>
                    <div className="w-2.5 h-px left-[112.53px] top-0 absolute origin-top-left rotate-90 border-2 border-slate-950/opacity-50"></div>
                    <div className="w-2.5 h-px left-[72.81px] top-0 absolute origin-top-left rotate-90 border-2 border-slate-950/opacity-50"></div>
                    <div className="w-2.5 h-px left-[152.24px] top-0 absolute origin-top-left rotate-90 border-2 border-slate-950/opacity-50"></div>
                    </div>
                    <div className="w-7 h-7 left-0 top-0 absolute bg-slate-950 rounded-3xl">
                    <div className="w-1 h-3 left-[8.83px] top-[8.28px] absolute bg-slate-50 rounded-sm" />
                    <div className="w-1 h-3 left-[16px] top-[8.28px] absolute bg-slate-50 rounded-sm" />
                    </div>
                    <div className="w-4 h-1 left-[166.87px] top-[22.34px] absolute text-slate-950 text-xs font-medium font-['PP Pangram Sans']">-1:20</div>
                </div>
                </div> */}
            {/* </div> */}
            {/* </div> */}
          {/* <h3 className="text-2xl sm:text-4xl font-bold">Quick Setup</h3> */}
          <div className="flex flex-col sm:flex-row min-h-screen w-full">
            <div className="flex flex-row sm:flex-col w-full sm:w-1/4 sm:p-5 sm:space-y-4">
                <div className="w-56 h-11 px-6 py-2 bg-slate-50 rounded-lg shadow justify-start items-center gap-96 inline-flex cursor-pointer" onClick={() => handleSectionChange('setup')}>
                    <div className="grow shrink basis-0 text-center text-black font-semibold font-['PP Pangram Sans']">
                        <span className= "hidden sm:inline text-2xl">Quick Setup</span>
                        <span className= "sm:hidden text-md">Create</span>
                    </div>
                </div>
                <div className="w-56 h-11 px-6 py-2 bg-slate-50/opacity-20 rounded-lg shadow justify-start items-center gap-96 inline-flex cursor-pointer" onClick={() => handleSectionChange('share')}>
                    <div className="grow shrink basis-0 text-center text-slate-50 font-semibold font-['PP Pangram Sans']">
                        <span className= "hidden sm:inline text-2xl">Easy Sharing</span>
                        <span className= "sm:hidden text-md">Share</span>
                    </div>
                </div>
                <div className="w-56 h-11 px-6 py-2 bg-slate-50/opacity-20 rounded-lg shadow justify-start items-center gap-96 inline-flex cursor-pointer" onClick={() => handleSectionChange('review')}>
                    <div className="grow shrink basis-0 text-center text-slate-50 font-semibold font-['PP Pangram Sans']">
                        <span className= "hidden sm:inline text-2xl">Efficient Review</span>
                        <span className= "sm:hidden text-md">Review</span>
                    </div>
                </div>
                <div className="w-56 h-11 px-6 py-2 bg-slate-50/opacity-20 rounded-lg shadow justify-start items-center gap-96 inline-flex cursor-pointer" onClick={() => handleSectionChange('access')}>
                    <div className="grow shrink basis-0 text-center text-slate-50 font-semibold font-['PP Pangram Sans']">
                        <span className= "hidden sm:inline text-2xl">Team Access</span>
                        <span className= "sm:hidden text-md">Permission</span>
                    </div>
                </div>
            </div>
            <div className="w-full sm:w-3/4 p-8">
                <p className="my-4 text-3xl sm:text-7xl font-bold"><span className="text-primary">Create</span> your page in minutes.</p>
                <p className="my-4 text-l sm:text-xl">Showcase your vibe, connect your socials, and specify your needs.</p>
                <div className="w-50 h-10 sm:w-80 sm:h-14 px-12 py-4 bg-gradient-to-r from-indigo-400 to-indigo-400 rounded-3xl shadow justify-center items-center gap-2.5 inline-flex">
                    <div className="text-slate-50 text-l sm:text-xl font-medium font-['PP Pangram Sans']">Create your page now</div>
                </div>
            </div>
          </div>
          <img className="w-320 h-60 top-[1500px] right-[200px] absolute" src="/assets/images/login/xcelencia.svg" />
          <img className="w-120 h-25 left-[120px] top-[218px] absolute" src="/assets/images/login/UploadTrack.svg" />
        </section>

        <section id="share" className="h-screen my-12">
        <div className="flex flex-col sm:flex-row min-h-screen w-full">
            <div className="flex flex-row sm:flex-col w-full sm:w-1/4 sm:p-5 sm:space-y-4">
                <div className="w-56 h-11 px-6 py-2 bg-slate-50/opacity-20 rounded-lg shadow justify-start items-center gap-96 inline-flex cursor-pointer" onClick={() => scrollToSection('setup')}>
                    <div className="grow shrink basis-0 text-center text-slate-50 font-semibold font-['PP Pangram Sans']">
                        <span className= "hidden sm:inline text-2xl">Quick Setup</span>
                        <span className= "sm:hidden text-md">Create</span>
                    </div>
                </div>
                <div className="w-56 h-11 px-6 py-2 bg-slate-50 rounded-lg shadow justify-start items-center gap-96 inline-flex cursor-pointer" onClick={() => scrollToSection('share')}>
                    <div className="grow shrink basis-0 text-center text-black font-semibold font-['PP Pangram Sans']">
                        <span className= "hidden sm:inline text-2xl">Easy Sharing</span>
                        <span className= "sm:hidden text-md">Share</span>
                    </div>
                </div>
                <div className="w-56 h-11 px-6 py-2 bg-slate-50/opacity-20 rounded-lg shadow justify-start items-center gap-96 inline-flex cursor-pointer" onClick={() => scrollToSection('review')}>
                    <div className="grow shrink basis-0 text-center text-slate-50 font-semibold font-['PP Pangram Sans']">
                        <span className= "hidden sm:inline text-2xl">Efficient Review</span>
                        <span className= "sm:hidden text-md">Review</span>
                    </div>
                </div>
                <div className="w-56 h-11 px-6 py-2 bg-slate-50/opacity-20 rounded-lg shadow justify-start items-center gap-96 inline-flex cursor-pointer" onClick={() => scrollToSection('access')}>
                    <div className="grow shrink basis-0 text-center text-slate-50 font-semibold font-['PP Pangram Sans']">
                        <span className= "hidden sm:inline text-2xl">Team Access</span>
                        <span className= "sm:hidden text-md">Permission</span>
                    </div>
                </div>
            </div>
            <div className="w-full sm:w-3/4 p-8">
              <p className="my-4 text-3xl sm:text-7xl font-bold"><span className="text-primary">Share</span> it to receive submissions</p>
              <p className="my-4 text-l sm:text-xl">Broadcast your URL across all platforms so collaborators can find you.</p>
              <div className="w-50 h-10 sm:w-80 sm:h-14 px-12 py-4 bg-gradient-to-r from-indigo-400 to-indigo-400 rounded-3xl shadow justify-center items-center gap-2.5 inline-flex">
                <div className="text-slate-50 text-l sm:text-xl font-medium font-['PP Pangram Sans']">Create your page now</div>
              </div>
            </div>
          </div>
        </section>

        <section id="review" className="h-screen my-12">
        <div className="flex flex-col sm:flex-row min-h-screen w-full">
            <div className="flex flex-row sm:flex-col w-full sm:w-1/4 sm:p-5 sm:space-y-4">
                <div className="w-56 h-11 px-6 py-2 bg-slate-50/opacity-20 rounded-lg shadow justify-start items-center gap-96 inline-flex cursor-pointer" onClick={() => scrollToSection('setup')}>
                    <div className="grow shrink basis-0 text-center text-slate-50 font-semibold font-['PP Pangram Sans']">
                        <span className= "hidden sm:inline text-2xl">Quick Setup</span>
                        <span className= "sm:hidden text-md">Create</span>
                    </div>
                </div>
                <div className="w-56 h-11 px-6 py-2 bg-slate-50/opacity-20 rounded-lg shadow justify-start items-center gap-96 inline-flex cursor-pointer" onClick={() => scrollToSection('share')}>
                    <div className="grow shrink basis-0 text-center text-slate-50 font-semibold font-['PP Pangram Sans']">
                        <span className= "hidden sm:inline text-2xl">Easy Sharing</span>
                        <span className= "sm:hidden text-md">Share</span>
                    </div>
                </div>
                <div className="w-56 h-11 px-6 py-2 bg-slate-50 rounded-lg shadow justify-start items-center gap-96 inline-flex cursor-pointer" onClick={() => scrollToSection('review')}>
                    <div className="grow shrink basis-0 text-center text-black font-semibold font-['PP Pangram Sans']">
                        <span className= "hidden sm:inline text-2xl">Efficient Review</span>
                        <span className= "sm:hidden text-md">Review</span>
                    </div>
                </div>
                <div className="w-56 h-11 px-6 py-2 bg-slate-50/opacity-20 rounded-lg shadow justify-start items-center gap-96 inline-flex cursor-pointer" onClick={() => scrollToSection('access')}>
                    <div className="grow shrink basis-0 text-center text-slate-50 font-semibold font-['PP Pangram Sans']">
                        <span className= "hidden sm:inline text-2xl">Team Access</span>
                        <span className= "sm:hidden text-md">Permission</span>
                    </div>
                </div>
            </div>
            <div className="w-full sm:w-3/4 p-8">
              <p className="my-4 text-3xl sm:text-7xl font-bold"><span className="text-primary">Review</span> and <span className="text-primary">save</span> favorites</p>
              <p className="my-4 text-l sm:text-xl">Stop searching across different platforms. Easily pin your favorite content for quick reference.</p>
              <div className="w-50 h-10 sm:w-80 sm:h-14 px-12 py-4 bg-gradient-to-r from-indigo-400 to-indigo-400 rounded-3xl shadow justify-center items-center gap-2.5 inline-flex">
                <div className="text-slate-50 text-l sm:text-xl font-medium font-['PP Pangram Sans']">Create your page now</div>
              </div>
            </div>
          </div>
        </section>

        <section id="access" className="h-screen my-8 text-center">
        <div className="flex flex-col sm:flex-row min-h-screen w-full">
            <div className="flex flex-row sm:flex-col w-full sm:w-1/4 sm:p-5 sm:space-y-4">
                <div className="w-56 h-11 px-6 py-2 bg-slate-50/opacity-20 rounded-lg shadow justify-start items-center gap-96 inline-flex cursor-pointer" onClick={() => scrollToSection('setup')}>
                    <div className="grow shrink basis-0 text-center text-slate-50 font-semibold font-['PP Pangram Sans']">
                        <span className= "hidden sm:inline text-2xl">Quick Setup</span>
                        <span className= "sm:hidden text-md">Create</span>
                    </div>
                </div>
                <div className="w-56 h-11 px-6 py-2 bg-slate-50/opacity-20 rounded-lg shadow justify-start items-center gap-96 inline-flex cursor-pointer" onClick={() => scrollToSection('share')}>
                    <div className="grow shrink basis-0 text-center text-slate-50 font-semibold font-['PP Pangram Sans']">
                        <span className= "hidden sm:inline text-2xl">Easy Sharing</span>
                        <span className= "sm:hidden text-md">Share</span>
                    </div>
                </div>
                <div className="w-56 h-11 px-6 py-2 bg-slate-50/opacity-20 rounded-lg shadow justify-start items-center gap-96 inline-flex cursor-pointer" onClick={() => scrollToSection('review')}>
                    <div className="grow shrink basis-0 text-center text-slate-50 font-semibold font-['PP Pangram Sans']">
                        <span className= "hidden sm:inline text-2xl">Efficient Review</span>
                        <span className= "sm:hidden text-md">Review</span>
                    </div>
                </div>
                <div className="w-56 h-11 px-6 py-2 bg-slate-50 rounded-lg shadow justify-start items-center gap-96 inline-flex cursor-pointer" onClick={() => scrollToSection('access')}>
                    <div className="grow shrink basis-0 text-center text-black font-semibold font-['PP Pangram Sans']">
                        <span className= "hidden sm:inline text-2xl">Team Access</span>
                        <span className= "sm:hidden text-md">Permission</span>
                    </div>
                </div>
            </div>
            <div className="w-full sm:w-3/4 p-8">
              <p className="my-4 text-3xl sm:text-7xl font-bold">Grant <span className="text-primary">access</span> to your team</p>
              <p className="my-4 text-l sm:text-xl">Set custom permissions to outsource your A&R efforts to your team and fans.</p>
              <div className="w-50 h-10 sm:w-80 sm:h-14 px-12 py-4 bg-gradient-to-r from-indigo-400 to-indigo-400 rounded-3xl shadow justify-center items-center gap-2.5 inline-flex">
                <div className="text-slate-50 text-l sm:text-xl font-medium font-['PP Pangram Sans']">Create your page now</div>
              </div>
            </div>
          </div>
        </section>

        <section id="testimonials" className="h-screen my-12">
            <div className="text-indigo-400 text-3xl sm:text-7xl text-left font-semibold font-['PP Pangram Sans']">What users say</div>
          <blockquote className="my-4 text-xl sm:text-4xl p-4 rounded text-white font-bold">
            <p>“Receiving beats used to be overwhelming, and managing files felt like a chore. I tried a dedicated email for loops, but reviewing each file was time-consuming. Stems transformed my workflow, allowing me to concentrate on creating hits.”</p>
            <div className="mt-4 flex items-center justify-center">
                <img className="w-12 h-12 sm:w-16 sm:h-16 rounded-full shadow mr-6" src="/assets/images/login/Ellipse-28.jpg" alt="AusGod" />
                <cite className="block mt-4 text-sm sm:text-xl"><span className="text-indigo-400 font-semibold font-['PP Pangram Sans'] leading-9">AusGod, artist & producer</span></cite>
            </div>
          </blockquote>
        </section>

        <section id="start" className="pt-14 my-12 bg-gradient-to-b from-dark1 to-indigo-400">
          <h3 className="text-3xl sm:text-7xl font-bold mb-4">Start receiving beats today.</h3>
          <div className="w-50 h-10 sm:w-80 sm:h-14 px-12 py-4 mb-14 bg-gradient-to-r from-indigo-400 to-indigo-400 rounded-3xl shadow justify-center items-center gap-2.5 inline-flex">
             <div className="text-slate-50 text-sm sm:text-xl font-medium font-['PP Pangram Sans']">Create your page now</div>
          </div>
        </section>
      </main>

      <footer className=" text-white p-4 text-center flex justify-between items-center">
        <div>
            <a href="https://x.com/0xStems" target="_blank" rel="noopener noreferrer">
                <Image src="/assets/images/login/logo-white.png" alt="X Logo" width={24} height={24} />
            </a>
        </div>
        <div className="hidden sm:flex justify-center items-center ml-40">
            <a href="#setup" className="hover:text-primary mx-2" onClick={(e) => {
                e.preventDefault();
                scrollToSection('setup');
            }}>How it works</a>
            <a href="https://x.com/0xStems" target="_blank" rel="noopener noreferrer" className="ml-4 hover:text-primary">Contact</a>
        </div>
        <p>0xStems ©2024 Privacy Terms</p>
      </footer>
    </div>
  );
};

export default LandingPage;