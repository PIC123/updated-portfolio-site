import React from 'react';
import { useTheme } from 'next-themes';
import styles from './ProjectDetailsModal.module.css';
import AwesomeSlider from 'react-awesome-slider';
import AwesomeSliderStyles from './scss/light-slider.module.scss';
import AwesomeSliderStylesDark from './scss/dark-slider.module.scss';
import 'react-awesome-slider/dist/custom-animations/scale-out-animation.css';

const ProjectDetailsModal = ({ show, onHide, data }) => {
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';

  if (!show || !data) {
    return null;
  }

  const { technologies, images, title, description, url, startDate } = data;


  const tech = technologies?.map((icons, i) => (
    <li className={`${styles.techItem} ${isDarkMode ? styles.darkMode : ''}`} key={i}>
      <span>
        <div className={styles.techIcon}>
          {/* <i className={icons.class}>
            <p className={styles.techName}>{icons.name}</p>
          </i> */}
          <p className={styles.techName}>{icons.name}</p>
        </div>
      </span>
    </li>
  ));

  const img = images?.map((elem, i) => (
    <div key={i} data-src={elem} />
  ));

  return (
    <>
      <div className={`${styles.modalBackdrop} ${isDarkMode ? styles.darkMode : ''}`} onClick={onHide}></div>
      <div className={`${styles.modalContent} ${isDarkMode ? styles.darkMode : ''}`}>
        <span onClick={onHide} className={`${styles.modalClose} ${isDarkMode ? styles.darkMode : ''}`}>
          <i className="fas fa-times"></i>
        </span>

        <div className={styles.sliderContainer}>
          {img.length > 1 ? <AwesomeSlider
            cssModule={isDarkMode ? AwesomeSliderStylesDark : AwesomeSliderStyles}
            animation="scaleOutAnimation"
            className={`${styles.sliderImage} ${isDarkMode ? styles.darkMode : ''}`}
          >
            {img}
          </AwesomeSlider>:(
            <div className={`${styles.sliderImage} ${isDarkMode ? styles.darkMode : ''}`}>
              <img src={images[0]} alt={title} />
            </div>
          )}
        </div>

        <div className={`${styles.projectInfo} ${isDarkMode ? styles.darkMode : ''}`}>
          <div className={styles.titleContainer}>
              <h3 className={`${styles.projectTitle} ${isDarkMode ? styles.darkMode : ''}`}>
                {title}
              </h3>
              {url && (
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${styles.learnMoreButton} ${isDarkMode ? styles.darkMode : ''}`}
                >
                  <i className="fas fa-external-link-alt"></i>
                  <span>Learn More</span>
              </a>
              )}
            </div>
          <p className={`${styles.projectDescription} ${isDarkMode ? styles.darkMode : ''}`}>{description}</p>
          <div className={styles.techContainer}>
            <ul className={styles.techList}>{tech}</ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProjectDetailsModal;