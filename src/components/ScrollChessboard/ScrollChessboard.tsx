import React, {useEffect, useState, useMemo, useCallback, useRef} from 'react';
import {motion, AnimatePresence} from 'framer-motion';

interface Piece {
  row: number;
  col: number;
  color: 'black' | 'white';
  id: number;
  moveNumber: number;
}

interface LiveChatMessage {
  id: string;
  username: string;
  text: string;
  timestamp: number;
  isPlayer?: boolean;
  playerColor?: 'black' | 'white';
}

// Random audience names
const AUDIENCE_NAMES = [
  'GoMaster2024',
  'CaroKing',
  'ChessLover',
  'BoardWatcher',
  'GameFan99',
  'StrategyPro',
  'MoveAnalyzer',
  'PiecePlacer',
  'GridGamer',
  'BoardBuddy',
  'GameWatcher',
  'CaroExpert',
  'GoPlayer',
  'ChessFan',
  'BoardMaster',
  'MoveMaker',
  'GameGuru',
  'StrategyStar',
  'PiecePro',
  'GridGenius',
];

// Audience chat messages
const AUDIENCE_MESSAGES = [
  'Nice move! 👏',
  'This is getting interesting! 🎮',
  'What a play! 🔥',
  'I see what you did there! 😏',
  'Good strategy! 💪',
  'This is intense! ⚡',
  'Amazing game! 🎯',
  'Who will win? 🤔',
  'Great positioning! 🎪',
  'Love this game! ❤️',
  'Keep it up! 🚀',
  'Brilliant! ✨',
  'This is fun to watch! 👀',
  'Nice defense! 🛡️',
  'Clever move! 🧠',
  'Wow! 😲',
  'Impressive! 👌',
  'Good game! 🎉',
  'Well played! 🏆',
  'Exciting match! 🎬',
];

// Player messages
const BLACK_MESSAGES = [
  "Let's start strong! 💪",
  'Hmm, interesting move... 🤔',
  "I see what you're doing! 😏",
  'Not bad, but watch this! 🎯',
  "You're making this too easy! 😎",
  'Time to show my skills! ⚡',
  'This is getting intense! 🔥',
  "I'm just warming up! 💨",
  "You're in trouble now! 😈",
  'Checkmate... wait, wrong game! 😅',
  "I'm playing 4D chess here! 🧠",
  'Your move was... predictable! 🎭',
];

const WHITE_MESSAGES = [
  "Good opening! Let's see... 🧐",
  'Nice try, but I got this! 💪',
  "You're good, but I'm better! 😤",
  'This is fun! Keep going! 🎮',
  'I see your strategy! 👀',
  'Time to counter-attack! ⚔️',
  "You're making me work! 😅",
  "I'm just getting started! 🚀",
  'This is my favorite part! 🎪',
  "You're playing well! 👏",
  'Let me think... 🤓',
  "I'm enjoying this game! 😊",
];

const ScrollChessboard = (): React.ReactElement => {
  const BOARD_SIZE = 9;
  const CELL_SIZE = 20;
  const BOARD_PADDING = 10;
  const BOARD_WIDTH = BOARD_PADDING * 2 + (BOARD_SIZE - 1) * CELL_SIZE;
  const BOARD_HEIGHT = BOARD_WIDTH;

  const [pieces, setPieces] = useState<Piece[]>([]);
  const [board, setBoard] = useState<Array<Array<'black' | 'white' | null>>>([]);
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [liveChat, setLiveChat] = useState<LiveChatMessage[]>([]);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Initialize board
  useEffect(() => {
    setBoard(
      Array(BOARD_SIZE)
        .fill(null)
        .map(() => Array(BOARD_SIZE).fill(null)),
    );
  }, []);

  useEffect(() => {
    const updateScrollProgress = (): void => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY || document.documentElement.scrollTop;

      const totalScrollableHeight = documentHeight - windowHeight;
      const progress = totalScrollableHeight > 0 ? (scrollTop / totalScrollableHeight) * 100 : 0;

      setScrollProgress(Math.min(100, Math.max(0, progress)));
    };

    updateScrollProgress();
    window.addEventListener('scroll', updateScrollProgress, {passive: true});
    window.addEventListener('resize', updateScrollProgress, {passive: true});

    return () => {
      window.removeEventListener('scroll', updateScrollProgress);
      window.removeEventListener('resize', updateScrollProgress);
    };
  }, []);

  // Auto-scroll chat to bottom
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [liveChat]);

  // Check if position is valid
  const isValidMove = useCallback((row: number, col: number, currentBoard: Array<Array<'black' | 'white' | null>>): boolean => {
    return row >= 0 && row < BOARD_SIZE && col >= 0 && col < BOARD_SIZE && currentBoard[row][col] === null;
  }, []);

  // Count consecutive pieces in a direction
  const countInDirection = useCallback(
    (
      row: number,
      col: number,
      dirRow: number,
      dirCol: number,
      color: 'black' | 'white',
      currentBoard: Array<Array<'black' | 'white' | null>>,
    ): number => {
      let count = 0;
      let r = row + dirRow;
      let c = col + dirCol;

      while (r >= 0 && r < BOARD_SIZE && c >= 0 && c < BOARD_SIZE && currentBoard[r][c] === color) {
        count++;
        r += dirRow;
        c += dirCol;
      }

      return count;
    },
    [],
  );

  // Evaluate position score (for AI)
  const evaluatePosition = useCallback(
    (row: number, col: number, color: 'black' | 'white', currentBoard: Array<Array<'black' | 'white' | null>>): number => {
      if (!isValidMove(row, col, currentBoard)) return -1;

      const directions = [
        [0, 1], // horizontal
        [1, 0], // vertical
        [1, 1], // diagonal \
        [1, -1], // diagonal /
      ];

      let score = 0;
      const opponentColor = color === 'black' ? 'white' : 'black';

      for (const [dirRow, dirCol] of directions) {
        const forward = countInDirection(row, col, dirRow, dirCol, color, currentBoard);
        const backward = countInDirection(row, col, -dirRow, -dirCol, color, currentBoard);
        const total = forward + backward;

        if (total >= 3) score += 1000;
        else if (total === 2) score += 100;
        else if (total === 1) score += 10;

        const oppForward = countInDirection(row, col, dirRow, dirCol, opponentColor, currentBoard);
        const oppBackward = countInDirection(row, col, -dirRow, -dirCol, opponentColor, currentBoard);
        const oppTotal = oppForward + oppBackward;

        if (oppTotal >= 3) score += 500;
        else if (oppTotal === 2) score += 50;
      }

      const center = BOARD_SIZE / 2;
      const distFromCenter = Math.abs(row - center) + Math.abs(col - center);
      score += (BOARD_SIZE - distFromCenter) * 2;

      return score;
    },
    [isValidMove, countInDirection],
  );

  // Find best move using simple AI
  const findBestMove = useCallback(
    (
      color: 'black' | 'white',
      currentBoard: Array<Array<'black' | 'white' | null>>,
      currentPieces: Piece[],
    ): {row: number; col: number} | null => {
      let bestScore = -1;
      let bestMove: {row: number; col: number} | null = null;

      if (currentPieces.length === 0) {
        const center = Math.floor(BOARD_SIZE / 2);
        return {row: center, col: center};
      }

      for (let row = 0; row < BOARD_SIZE; row++) {
        for (let col = 0; col < BOARD_SIZE; col++) {
          const score = evaluatePosition(row, col, color, currentBoard);
          if (score > bestScore) {
            bestScore = score;
            bestMove = {row, col};
          }
        }
      }

      return bestMove;
    },
    [evaluatePosition],
  );

  // Calculate pieces based on scroll progress with valid gameplay
  useEffect(() => {
    const maxMoves = 25;
    const movesToShow = Math.floor((scrollProgress / 100) * maxMoves);

    if (movesToShow === 0) {
      setPieces([]);
      setLiveChat([]);
      setBoard(
        Array(BOARD_SIZE)
          .fill(null)
          .map(() => Array(BOARD_SIZE).fill(null)),
      );
      return;
    }

    const newBoard = Array(BOARD_SIZE)
      .fill(null)
      .map(() => Array(BOARD_SIZE).fill(null));
    const newPieces: Piece[] = [];
    const newChatMessages: LiveChatMessage[] = [];

    for (let move = 0; move < movesToShow; move++) {
      const isBlackTurn = move % 2 === 0;
      const color = isBlackTurn ? 'black' : 'white';

      const bestMove = findBestMove(color, newBoard, newPieces);

      if (bestMove) {
        newBoard[bestMove.row][bestMove.col] = color;
        newPieces.push({
          row: bestMove.row,
          col: bestMove.col,
          color,
          id: move,
          moveNumber: move + 1,
        });

        // Add player message every few moves
        if (move % 4 === 0 || move === movesToShow - 1) {
          const messages = color === 'black' ? BLACK_MESSAGES : WHITE_MESSAGES;
          const messageIndex = Math.floor(move / 4) % messages.length;
          newChatMessages.push({
            id: `player-${move}`,
            username: color === 'black' ? 'Player 1' : 'Player 2',
            text: messages[messageIndex],
            timestamp: Date.now() + move * 1000,
            isPlayer: true,
            playerColor: color,
          });
        }

        // Add random audience messages
        if (move > 0 && Math.random() > 0.6) {
          const randomName = AUDIENCE_NAMES[Math.floor(Math.random() * AUDIENCE_NAMES.length)];
          const randomMessage = AUDIENCE_MESSAGES[Math.floor(Math.random() * AUDIENCE_MESSAGES.length)];
          newChatMessages.push({
            id: `audience-${move}-${Math.random()}`,
            username: randomName,
            text: randomMessage,
            timestamp: Date.now() + move * 1000 + 500,
            isPlayer: false,
          });
        }
      }
    }

    setPieces(newPieces);
    setBoard(newBoard);
    setLiveChat(newChatMessages);
  }, [scrollProgress, findBestMove]);

  const getPiecePosition = (row: number, col: number) => {
    return {
      x: BOARD_PADDING + col * CELL_SIZE,
      y: BOARD_PADDING + row * CELL_SIZE,
    };
  };

  return (
    <div className='hidden xl:block fixed left-6 top-32 z-10 pointer-events-none'>
      {/* YouTube-style embedded container */}
      <div className='relative bg-black/80 rounded-lg overflow-hidden shadow-2xl border border-gray-800/50' style={{width: '420px'}}>
        {/* Main content area - board and chat side by side */}
        <div className='flex'>
          {/* Left: Chessboard (like video player) */}
          <div className='relative bg-black flex-shrink-0' style={{width: '200px', height: '200px'}}>
            <svg
              width='200'
              height='200'
              viewBox={`0 0 ${BOARD_WIDTH} ${BOARD_HEIGHT}`}
              className='w-full h-full'
              xmlns='http://www.w3.org/2000/svg'
            >
              <defs>
                <filter id='pieceShadow'>
                  <feGaussianBlur in='SourceAlpha' stdDeviation='1' />
                  <feOffset dx='1' dy='1' result='offsetblur' />
                  <feComponentTransfer>
                    <feFuncA type='linear' slope='0.3' />
                  </feComponentTransfer>
                  <feMerge>
                    <feMergeNode />
                    <feMergeNode in='SourceGraphic' />
                  </feMerge>
                </filter>
              </defs>

              {/* Board background */}
              <rect width={BOARD_WIDTH} height={BOARD_HEIGHT} fill='rgba(17, 34, 64, 0.95)' rx='2' className='border border-primary/20' />

              {/* Grid lines */}
              <g className='text-primary/40'>
                {Array.from({length: BOARD_SIZE}).map((_, i) => (
                  <line
                    key={`v-${i}`}
                    x1={BOARD_PADDING + i * CELL_SIZE}
                    y1={BOARD_PADDING}
                    x2={BOARD_PADDING + i * CELL_SIZE}
                    y2={BOARD_PADDING + (BOARD_SIZE - 1) * CELL_SIZE}
                    stroke='currentColor'
                    strokeWidth='0.5'
                  />
                ))}
                {Array.from({length: BOARD_SIZE}).map((_, i) => (
                  <line
                    key={`h-${i}`}
                    x1={BOARD_PADDING}
                    y1={BOARD_PADDING + i * CELL_SIZE}
                    x2={BOARD_PADDING + (BOARD_SIZE - 1) * CELL_SIZE}
                    y2={BOARD_PADDING + i * CELL_SIZE}
                    stroke='currentColor'
                    strokeWidth='0.5'
                  />
                ))}
              </g>

              {/* Pieces */}
              {pieces.map(piece => {
                const pos = getPiecePosition(piece.row, piece.col);
                return (
                  <motion.circle
                    key={piece.id}
                    cx={pos.x}
                    cy={pos.y}
                    r='6'
                    fill={piece.color === 'black' ? '#1a1a1a' : '#f5f5f5'}
                    stroke={piece.color === 'black' ? '#000' : '#ddd'}
                    strokeWidth='0.5'
                    filter='url(#pieceShadow)'
                    initial={{scale: 0, opacity: 0}}
                    animate={{scale: 1, opacity: 1}}
                    transition={{
                      type: 'spring',
                      stiffness: 300,
                      damping: 20,
                      delay: piece.id * 0.05,
                    }}
                  />
                );
              })}
            </svg>

            {/* YouTube-style controls overlay (optional) */}
            <div className='absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-black/60 to-transparent pointer-events-none'></div>
          </div>

          {/* Right: Live Chat (YouTube style) */}
          <div className='relative flex-1 bg-[#0f0f0f] border-l border-gray-800/50' style={{width: '220px', height: '200px'}}>
            {/* Chat Header - YouTube style */}
            <div className='absolute top-0 left-0 right-0 bg-[#181818] border-b border-gray-800 px-3 py-2 z-10'>
              <div className='flex items-center gap-2'>
                <div className='flex items-center gap-1.5'>
                  <div className='w-2 h-2 rounded-full bg-red-500'></div>
                  <span className='text-xs text-white font-medium'>LIVE</span>
                </div>
                <span className='text-[10px] text-gray-400 ml-auto'>{liveChat.length}</span>
              </div>
            </div>

            {/* Chat Messages Container - YouTube style */}
            <div
              ref={chatContainerRef}
              className='absolute top-10 left-0 right-0 bottom-0 overflow-y-auto px-2 py-2'
              style={{
                scrollbarWidth: 'thin',
                scrollbarColor: 'rgba(255, 255, 255, 0.1) transparent',
              }}
            >
              <div className='space-y-1.5'>
                <AnimatePresence>
                  {liveChat.map(message => (
                    <motion.div
                      key={message.id}
                      initial={{opacity: 0, y: 5}}
                      animate={{opacity: 1, y: 0}}
                      exit={{opacity: 0, y: -5}}
                      transition={{duration: 0.15}}
                      className='text-[11px] leading-relaxed'
                    >
                      {message.isPlayer ? (
                        <div className='flex items-start gap-1.5'>
                          <div
                            className={`w-2.5 h-2.5 rounded-full flex-shrink-0 mt-0.5 ${
                              message.playerColor === 'black' ? 'bg-gray-800 border border-gray-600' : 'bg-gray-200 border border-gray-400'
                            }`}
                          ></div>
                          <div className='flex-1 min-w-0'>
                            <span className={`font-semibold ${message.playerColor === 'black' ? 'text-[#64ffda]' : 'text-[#e6f1ff]'}`}>
                              {message.username}
                            </span>
                            <span className='text-gray-300 ml-1'>{message.text}</span>
                          </div>
                        </div>
                      ) : (
                        <div>
                          <span className='text-[#3ea6ff] font-medium'>{message.username}</span>
                          <span className='text-gray-300 ml-1'>{message.text}</span>
                        </div>
                      )}
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>

            {/* Gradient fade at top - YouTube style */}
            <div className='absolute top-10 left-0 right-0 h-6 bg-gradient-to-b from-[#0f0f0f] to-transparent pointer-events-none z-5'></div>
          </div>
        </div>
      </div>

      {/* Move counter - below the container */}
      <div className='text-center text-xs text-gray-400 mt-2 whitespace-nowrap'>Move {pieces.length} / 25</div>
    </div>
  );
};

export default ScrollChessboard;
