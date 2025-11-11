import React, {useEffect, useState, useRef} from 'react';
import {motion, AnimatePresence} from 'framer-motion';
import {useTranslation} from '@/hooks/useTranslation';

interface ChatMessage {
  id: string;
  username: string;
  text: string;
  timestamp: number;
}

const VIEWER_NAMES = [
  'DevFan2024',
  'CodeLover',
  'PortfolioWatcher',
  'TechEnthusiast',
  'WebDevFan',
  'DesignLover',
  'ReactMaster',
  'NextJSFan',
  'TypeScriptPro',
  'FrontendGuru',
  'UILover',
  'CodeReviewer',
  'TechStreamer',
  'DevWatcher',
  'PortfolioFan',
  'WebDesigner',
  'ReactDev',
  'NextJSUser',
  'TypeScriptFan',
  'FrontendDev',
];

const AMBIANCE_AUDIO_URL = '/Developer Porfolio.mp3';

const StreamerView = (): React.ReactElement => {
  const {t} = useTranslation();
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [currentSection, setCurrentSection] = useState<string>('hero');
  const [isAudioEnabled, setIsAudioEnabled] = useState<boolean>(true);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const streamerContainerRef = useRef<HTMLDivElement>(null);
  const chatContainerWrapperRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const handleScroll = (): void => {
      const sections = ['hero', 'about', 'experience', 'work', 'contact'];
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const {offsetTop, offsetHeight} = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setCurrentSection(section);
            break;
          }
        }
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, {passive: true});
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio(AMBIANCE_AUDIO_URL);
      audioRef.current.loop = true;
      audioRef.current.volume = 0.15;
      audioRef.current.preload = 'auto';

      audioRef.current.addEventListener('error', e => {
        console.warn('Audio loading error:', e);
      });

      audioRef.current.addEventListener('ended', () => {
        if (audioRef.current && isAudioEnabled) {
          audioRef.current.currentTime = 0;
          audioRef.current.play().catch(() => {
            // Ignore autoplay errors
          });
        }
      });

      audioRef.current.addEventListener('pause', () => {
        if (audioRef.current && isAudioEnabled && audioRef.current.paused) {
          audioRef.current.play().catch(() => {
            // Ignore autoplay errors
          });
        }
      });
    }

    let checkAndResume: NodeJS.Timeout | null = null;

    if (isAudioEnabled) {
      const playAudio = async (): Promise<void> => {
        try {
          if (audioRef.current) {
            await audioRef.current.play();
          }
        } catch (error) {
          console.log('Audio autoplay blocked (requires user interaction). Click the audio button to enable.');
          if (audioRef.current) {
            audioRef.current.addEventListener(
              'canplay',
              () => {
                if (audioRef.current && isAudioEnabled) {
                  audioRef.current.play().catch(() => {
                    // Ignore autoplay errors
                  });
                }
              },
              {once: true},
            );
          }
        }
      };

      playAudio();

      checkAndResume = setInterval(() => {
        if (audioRef.current && isAudioEnabled && audioRef.current.paused) {
          audioRef.current.play().catch(() => {
            // Ignore autoplay errors
          });
        }
      }, 1000);
    } else {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    }

    return () => {
      if (checkAndResume) {
        clearInterval(checkAndResume);
      }
      if (audioRef.current && !isAudioEnabled) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [isAudioEnabled]);

  useEffect(() => {
    const streamerT = (t as any).streamer;
    const welcomeMessages: ChatMessage[] = streamerT.welcomeMessages.map((text: string, index: number) => ({
      id: `welcome-${index}`,
      username: VIEWER_NAMES[index % VIEWER_NAMES.length],
      text,
      timestamp: Date.now() + index * 500,
    }));
    setChatMessages(welcomeMessages);

    const intervals: NodeJS.Timeout[] = [];

    const fastInterval = setInterval(() => {
      const sectionMessages =
        streamerT.sectionMessages[currentSection as keyof typeof streamerT.sectionMessages] || streamerT.genericMessages;
      const messages = Array.isArray(sectionMessages) ? sectionMessages : streamerT.genericMessages;
      const randomMessage = messages[Math.floor(Math.random() * messages.length)];
      const randomName = VIEWER_NAMES[Math.floor(Math.random() * VIEWER_NAMES.length)];

      setChatMessages(prev => {
        const newMessage: ChatMessage = {
          id: `msg-${Date.now()}-${Math.random()}`,
          username: randomName,
          text: randomMessage,
          timestamp: Date.now(),
        };
        return [...prev.slice(-49), newMessage];
      });
    }, 800 + Math.random() * 700);

    const mediumInterval = setInterval(() => {
      if (Math.random() > 0.5) {
        const sectionMessages =
          streamerT.sectionMessages[currentSection as keyof typeof streamerT.sectionMessages] || streamerT.genericMessages;
        const messages = Array.isArray(sectionMessages) ? sectionMessages : streamerT.genericMessages;
        const randomMessage = messages[Math.floor(Math.random() * messages.length)];
        const randomName = VIEWER_NAMES[Math.floor(Math.random() * VIEWER_NAMES.length)];

        setChatMessages(prev => {
          const newMessage: ChatMessage = {
            id: `msg-${Date.now()}-${Math.random()}`,
            username: randomName,
            text: randomMessage,
            timestamp: Date.now(),
          };
          return [...prev.slice(-49), newMessage];
        });
      }
    }, 1500 + Math.random() * 1000);

    intervals.push(fastInterval, mediumInterval);

    return () => {
      intervals.forEach(interval => clearInterval(interval));
    };
  }, [currentSection, t]);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatMessages]);

  return (
    <>
      <div ref={streamerContainerRef} className='hidden xl:block fixed inset-0 z-20 pointer-events-none'>
        <motion.div
          className='absolute top-24 right-6'
          initial={{opacity: 0, scale: 0.9, x: 0, y: 0}}
          animate={{opacity: 1, scale: 1}}
          drag
          dragMomentum={false}
          dragConstraints={streamerContainerRef}
          dragElastic={0.1}
          whileDrag={{scale: 1.05, cursor: 'grabbing'}}
          style={{cursor: 'grab'}}
        >
          <div className='relative w-[180px] h-[240px] bg-black rounded-lg overflow-hidden shadow-2xl border-2 border-primary/30 pointer-events-auto'>
            <div className='absolute inset-0 bg-gradient-to-br from-primaryBg via-secondaryBg to-primaryBg'>
              <div className='absolute inset-0 opacity-20'>
                <div
                  className='absolute inset-0'
                  style={{
                    backgroundImage: `
                  linear-gradient(rgba(100, 255, 218, 0.1) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(100, 255, 218, 0.1) 1px, transparent 1px)
                `,
                    backgroundSize: '20px 20px',
                  }}
                />
              </div>
            </div>

            <div className='absolute inset-0 flex items-center justify-center'>
              <motion.div
                className='relative w-28 h-28 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 border-2 border-primary/30 flex items-center justify-center overflow-hidden'
                animate={{
                  scale: [1, 1.03, 1],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                <motion.div
                  className='text-5xl'
                  animate={{
                    y: [0, -2, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                >
                  👨‍💻
                </motion.div>

                {[0, 1, 2].map(i => (
                  <motion.div
                    key={i}
                    className='absolute inset-0 rounded-full border border-primary/20'
                    animate={{
                      scale: [1, 1.4 + i * 0.2, 1],
                      opacity: [0.3, 0, 0.3],
                    }}
                    transition={{
                      duration: 2 + i * 0.5,
                      repeat: Infinity,
                      ease: 'easeOut',
                      delay: i * 0.3,
                    }}
                  />
                ))}
              </motion.div>
            </div>

            <div className='absolute top-2 left-2 flex items-center gap-1.5 bg-red-500 px-2 py-0.5 rounded'>
              <div className='w-2 h-2 rounded-full bg-white animate-pulse'></div>
              <span className='text-[10px] text-white font-semibold'>{(t as any).streamer.live}</span>
            </div>

            <div className='absolute bottom-2 left-2 right-16 bg-black/60 backdrop-blur-sm rounded px-2 py-1'>
              <p className='text-xs text-white font-medium'>{(t as any).streamer.reviewingPortfolio}</p>
              <p className='text-[10px] text-gray-400'>{(t as any).streamer.portfolioReviewer}</p>
            </div>

            <div className='absolute top-2 right-2 bg-black/60 backdrop-blur-sm rounded px-2 py-1'>
              <p className='text-[10px] text-white'>
                {chatMessages.length}+ {(t as any).streamer.watching}
              </p>
            </div>

            <button
              onClick={() => setIsAudioEnabled(!isAudioEnabled)}
              className={`absolute bottom-2 right-2 bg-black/60 backdrop-blur-sm rounded px-2 py-1.5 hover:bg-black/80 transition-all pointer-events-auto z-10 ${
                isAudioEnabled ? 'ring-1 ring-primary/50' : ''
              }`}
              aria-label={isAudioEnabled ? (t as any).streamer.muteAudio : (t as any).streamer.enableAudio}
              title={isAudioEnabled ? (t as any).streamer.muteStreamingAudio : (t as any).streamer.enableStreamingAudio}
            >
              {isAudioEnabled ? (
                <svg className='w-3 h-3 text-primary' fill='currentColor' viewBox='0 0 20 20'>
                  <path
                    fillRule='evenodd'
                    d='M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.617.793L4.383 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.383l4.617-3.793a1 1 0 011.383.07zM14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071 1 1 0 01-1.414-1.414A7.971 7.971 0 0017 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 10a5.984 5.984 0 01-1.757 4.243 1 1 0 01-1.415-1.415A3.984 3.984 0 0013 10a3.983 3.983 0 00-1.172-2.828 1 1 0 010-1.415z'
                    clipRule='evenodd'
                  />
                </svg>
              ) : (
                <svg className='w-3 h-3 text-white' fill='currentColor' viewBox='0 0 20 20'>
                  <path
                    fillRule='evenodd'
                    d='M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.617.793L4.383 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.383l4.617-3.793a1 1 0 011.383.07zM14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071 1 1 0 01-1.414-1.414A7.971 7.971 0 0017 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 10a5.984 5.984 0 01-1.757 4.243 1 1 0 01-1.415-1.415A3.984 3.984 0 0013 10a3.983 3.983 0 00-1.172-2.828 1 1 0 010-1.415z'
                    clipRule='evenodd'
                  />
                  <path d='M3.28 2.22a.75.75 0 00-1.06 1.06l14.5 14.5a.75.75 0 101.06-1.06L3.28 2.22z' />
                </svg>
              )}
            </button>

            <div className='absolute top-2 left-1/2 -translate-x-1/2 w-12 h-1 bg-primary/30 rounded-full opacity-50'></div>
          </div>
        </motion.div>
      </div>

      <div ref={chatContainerWrapperRef} className='hidden xl:block fixed inset-0 z-20 pointer-events-none'>
        <motion.div
          className='absolute bottom-44 right-6'
          initial={{opacity: 0, scale: 0.9, x: 0, y: 0}}
          animate={{opacity: 1, scale: 1}}
          drag
          dragMomentum={false}
          dragConstraints={chatContainerWrapperRef}
          dragElastic={0.1}
          whileDrag={{scale: 1.02, cursor: 'grabbing'}}
          style={{cursor: 'grab'}}
        >
          <div className='relative w-[320px] h-[300px] bg-[#0f0f0f] rounded-lg overflow-hidden shadow-2xl border border-gray-800/50 pointer-events-auto'>
            <div className='absolute top-0 left-0 right-0 bg-[#181818] border-b border-gray-800 px-3 py-2 z-10 cursor-grab active:cursor-grabbing'>
              <div className='flex items-center gap-2'>
                <div className='flex items-center gap-1.5'>
                  <div className='w-2 h-2 rounded-full bg-red-500'></div>
                  <span className='text-xs text-white font-medium'>{(t as any).streamer.liveChat}</span>
                </div>
                <span className='text-[10px] text-gray-400 ml-auto'>
                  {chatMessages.length} {(t as any).streamer.viewers}
                </span>
              </div>
              <div className='absolute top-1 left-1/2 -translate-x-1/2 w-16 h-0.5 bg-gray-600 rounded-full opacity-50'></div>
            </div>

            <div
              ref={chatContainerRef}
              className='absolute top-10 left-0 right-0 bottom-0 overflow-y-auto px-3 py-2'
              style={{
                scrollbarWidth: 'thin',
                scrollbarColor: 'rgba(255, 255, 255, 0.1) transparent',
              }}
            >
              <div className='space-y-1.5'>
                <AnimatePresence>
                  {chatMessages.map(message => (
                    <motion.div
                      key={message.id}
                      initial={{opacity: 0, y: 5}}
                      animate={{opacity: 1, y: 0}}
                      exit={{opacity: 0, y: -5}}
                      transition={{duration: 0.15}}
                      className='text-[11px] leading-relaxed'
                    >
                      <span className='text-[#3ea6ff] font-medium'>{message.username}</span>
                      <span className='text-gray-300 ml-1'>{message.text}</span>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>

            <div className='absolute top-10 left-0 right-0 h-6 bg-gradient-to-b from-[#0f0f0f] to-transparent pointer-events-none z-5'></div>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default StreamerView;
