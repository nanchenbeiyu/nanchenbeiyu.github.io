// 监听滚动，实现技能进度条动画
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const progressBars = entry.target.querySelectorAll('.progress');
                    progressBars.forEach(bar => {
                        const percent = bar.parentElement.previousElementSibling.querySelector('.skill-percent').textContent;
                        bar.style.width = percent;
                    });
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });

        // 观察技能区域
        const skillsSection = document.getElementById('skills');
        if (skillsSection) {
            observer.observe(skillsSection);
        }

        // 动态生成更多星光（可选）
        function createStars() {
            const sky = document.querySelector('.starry-sky');
            for (let i = 0; i < 30; i++) {
                const star = document.createElement('div');
                star.style.position = 'absolute';
                star.style.width = Math.random() * 3 + 'px';
                star.style.height = star.style.width;
                star.style.backgroundColor = 'rgba(255, 255, 255, ' + (Math.random() * 0.5 + 0.3) + ')';
                star.style.borderRadius = '50%';
                star.style.top = Math.random() * 100 + '%';
                star.style.left = Math.random() * 100 + '%';
                star.style.animation = 'starPulse ' + (Math.random() * 5 + 3) + 's infinite alternate';
                sky.appendChild(star);
            }
        }

        // 页面加载完成后创建星光
        window.addEventListener('load', createStars);
