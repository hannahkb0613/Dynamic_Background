fetch('data/config.json')
  .then(response => response.json())
  .then(config => {
    const backgroundElement = document.querySelector('.gradient-background');
    const toggleButton = document.getElementById('toggleTheme');
    const content3 = document.querySelector('.content3');

    const isAboutPage = document.body.classList.contains('about-page');
    let currentColors = isAboutPage ? config.background.themes.about : config.background.colors;

    const setGradientColor = () => {
      backgroundElement.style.background = `linear-gradient(${config.background.direction}, ${currentColors.join(', ')})`;
      backgroundElement.style.backgroundSize = '200% 200%';
    };
    setGradientColor();

    document.styleSheets[0].insertRule(`
      @keyframes dynamicGradientAnimation {
        ${config.background.keyframes.map(f => `${f.position} { background-position: ${f.backgroundPosition}; }`).join(' ')}
      }
    `, 0);

    backgroundElement.style.animation = `dynamicGradientAnimation ${config.background.animationSpeed} ease-in-out infinite`;

    if (toggleButton) {
      toggleButton.onclick = () => {
        currentColors = currentColors === config.background.themes.day ? config.background.themes.night : config.background.themes.day;
        toggleButton.textContent = currentColors === config.background.themes.day ? "Night Mode" : "Day Mode";
        setGradientColor();

        if (content3) {
          content3.style.display = 'block';
        }
        document.querySelector('.content2').classList.add('paired');
      };
    }

    const greyscaleButton = document.getElementById('greyscaleButton');
    if (greyscaleButton) {
      greyscaleButton.onclick = () => location.reload();
    }
  });