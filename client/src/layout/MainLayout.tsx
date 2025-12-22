import { Outlet } from "react-router-dom";

export const MainLayout = () => {
  const generateStars = (count: number) => {
    // bg-animation logic
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: Math.random() * 2 + 1,
      animationDelay: Math.random() * 3,
      animationDuration: Math.random() * 3 + 2,
    }));
  };
  const stars = generateStars(50);

  return (
    <div className="bg-black min-h-screen w-full p-10 font-mono absolute inset-0 z-10">
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute rounded-full bg-white opacity-90"
          style={{
            left: `${star.left}%`,
            top: `${star.top}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            animation: `twinkle ${star.animationDuration}s infinite`,
            animationDelay: `${star.animationDelay}s`,
          }}
        />
      ))}
      <style>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
          }
          `}</style>

      <div className="z-50">
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
