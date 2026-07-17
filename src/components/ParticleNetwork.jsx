import { useEffect, useRef } from 'react';

const ParticleNetwork = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particles = [];
    
    // Canvas dimensions
    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const mouse = { x: null, y: null, radius: 150 };

    const handleMouseMove = (e) => {
      // Get mouse position relative to canvas
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouse.x = null;
      mouse.y = null;
    };

    window.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      init();
    };

    window.addEventListener('resize', handleResize);

    class Particle {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.size = Math.random() * 2 + 2; // Slightly larger particles
        this.density = (Math.random() * 20) + 1;
        this.vx = (Math.random() - 0.5) * 1; 
        this.vy = (Math.random() - 0.5) * 1;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fillStyle = 'rgba(59, 130, 246, 0.8)'; // Slightly brighter
        ctx.fill();
      }

      update() {
        // Free roaming movement
        this.x += this.vx;
        this.y += this.vy;

        // Bounce off edges gently
        if (this.x < 0 || this.x > width) this.vx = -this.vx;
        if (this.y < 0 || this.y > height) this.vy = -this.vy;

        // Strong Mouse repel
        if (mouse.x != null && mouse.y != null) {
          let dx = mouse.x - this.x;
          let dy = mouse.y - this.y;
          let distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < mouse.radius) {
            let forceDirectionX = dx / distance;
            let forceDirectionY = dy / distance;
            let force = (mouse.radius - distance) / mouse.radius;
            // Strong repel force
            let directionX = forceDirectionX * force * 5; 
            let directionY = forceDirectionY * force * 5;
            
            this.x -= directionX;
            this.y -= directionY;
          }
        }
        
        this.draw();
      }
    }

    const init = () => {
      particles = [];
      let numberOfParticles = (width * height) / 12000; 
      for (let i = 0; i < numberOfParticles; i++) {
        particles.push(new Particle());
      }
    };

    const connect = () => {
      let opacityValue = 1;
      for (let a = 0; a < particles.length; a++) {
        // Connect particles to each other
        for (let b = a; b < particles.length; b++) {
          let distance = Math.sqrt(
            ((particles[a].x - particles[b].x) ** 2) + 
            ((particles[a].y - particles[b].y) ** 2)
          );
          
          if (distance < 120) {
            opacityValue = 1 - (distance / 120);
            ctx.strokeStyle = `rgba(59, 130, 246, ${opacityValue * 0.6})`; // Slightly brighter lines
            ctx.lineWidth = 1.5; // Slightly thicker lines
            ctx.beginPath();
            ctx.moveTo(particles[a].x, particles[a].y);
            ctx.lineTo(particles[b].x, particles[b].y);
            ctx.stroke();
          }
        }
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
      }
      connect();
      animationFrameId = requestAnimationFrame(animate);
    };

    init();
    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
        opacity: 0.8 // Slightly higher global opacity
      }}
    />
  );
};

export default ParticleNetwork;
