// Typewriter effect
function typeWriter(element, text, speed = 50) {
    return new Promise((resolve) => {
        let i = 0;
        element.textContent = '';
        
        function type() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, speed);
            } else {
                resolve();
            }
        }
        
        type();
    });
}

// Terminal initialization sequence
async function initTerminal() {
    const terminal = document.querySelector('.terminal');
    const introCommand = document.getElementById('intro-command');
    const output = document.getElementById('output');
    const content = document.getElementById('content');
    
    // Initial command
    const commands = [
        'whoami',
        'cat about.txt',
        'ls skills/',
        'git remote -v',
        'contact --social'
    ];
    
    const outputs = [
        'danila\n',
        'Developer | автоматизация процессов и машинное обучение\nМосква\n',
        'JavaScript  Docker  SQL  Python  Postman  Webpack\nPandas  NumPy  PyTorch\n',
        'origin  https://github.com/DanilMochalov (fetch)\norigin  https://github.com/DanilMochalov (push)\n',
        'GitHub: github.com/DanilMochalov\nTelegram: @thejoypuck\nInstagram: @thejoypuck\n'
    ];
    
    // Show first command
    await typeWriter(introCommand, commands[0], 80);
    
    // Remove typing class after first command is complete
    introCommand.classList.remove('typing');
    
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Show first output
    const firstOutput = document.createElement('div');
    firstOutput.className = 'output';
    firstOutput.textContent = outputs[0];
    output.appendChild(firstOutput);
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Create additional command lines
    for (let i = 1; i < commands.length; i++) {
        const line = document.createElement('div');
        line.className = 'line';
        
        const prompt = document.createElement('span');
        prompt.className = 'prompt';
        prompt.textContent = 'danila@develop:~$';
        
        const command = document.createElement('span');
        command.className = 'command typing';
        command.id = `cmd-${i}`;
        
        line.appendChild(prompt);
        line.appendChild(command);
        terminal.querySelector('.terminal-body').appendChild(line);
        
        await typeWriter(command, commands[i], 80);
        
        // Remove typing class after typing is complete
        command.classList.remove('typing');
        
        await new Promise(resolve => setTimeout(resolve, 500));
        
        const outputLine = document.createElement('div');
        outputLine.className = 'output';
        outputLine.textContent = outputs[i];
        terminal.querySelector('.terminal-body').appendChild(outputLine);
        
        await new Promise(resolve => setTimeout(resolve, 1000));
    }
    
    // Final command
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const finalLine = document.createElement('div');
    finalLine.className = 'line';
    
    const finalPrompt = document.createElement('span');
    finalPrompt.className = 'prompt';
    finalPrompt.textContent = 'danila@develop:~$';
    
    const finalCommand = document.createElement('span');
    finalCommand.className = 'command';
    finalCommand.textContent = 'open portfolio';
    
    finalLine.appendChild(finalPrompt);
    finalLine.appendChild(finalCommand);
    terminal.querySelector('.terminal-body').appendChild(finalLine);
    
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Hide terminal and show content
    terminal.classList.add('hidden');
    content.classList.add('visible');
    
    // Animate sections
    const sections = document.querySelectorAll('.section');
    sections.forEach((section, index) => {
        setTimeout(() => {
            section.style.animationDelay = '0s';
            section.style.opacity = '1';
        }, index * 200);
    });
}

// Smooth scroll for anchor links
document.addEventListener('DOMContentLoaded', () => {
    // Initialize terminal animation
    initTerminal();
    
    // Add smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Contact links are already set in HTML
    
    // Add hover effects
    const terminalBlocks = document.querySelectorAll('.terminal-block');
    terminalBlocks.forEach(block => {
        block.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        block.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
});

// Add parallax effect on scroll (only when content is visible)
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const content = document.getElementById('content');
    if (!content || !content.classList.contains('visible')) {
        return; // Don't apply parallax until content is visible
    }
    
    const currentScroll = window.pageYOffset;
    const sections = document.querySelectorAll('.section');
    
    sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            const speed = 0.1;
            const yPos = -(currentScroll * speed);
            section.style.transform = `translateY(${yPos}px)`;
        }
    });
    
    lastScroll = currentScroll;
});

// Add keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Press 'T' to scroll to top
    if (e.key === 't' || e.key === 'T') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    
    // Press 'C' to scroll to contacts
    if (e.key === 'c' || e.key === 'C') {
        const contactSection = document.getElementById('contact');
        if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth' });
        }
    }
});

