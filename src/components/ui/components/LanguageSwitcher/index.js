import React from 'react';

import LanguageItem from './LanguageItem';
import languageData from './data';
import CustomScrollbars from 'util/CustomScrollbars';

const LanguageSwitcher = ({switchLanguage, handleRequestClose}) => {

  const english = languageData.filter(
    e => e.languageId === "english"
  )
  const spanish = languageData.filter(
    e => e.languageId === "spanish"
  )

  return (
    <CustomScrollbars className="messages-list language-list scrollbar" style={{height: 80}}>
      <ul className="list-unstyled">
        {english.map((language, index) => 
          <LanguageItem 
            key={index} language={language}
            handleRequestClose={handleRequestClose}
            switchLanguage={switchLanguage}
          />)}
        {spanish.map((language, index) => 
          <LanguageItem 
            key={index} language={language}
            handleRequestClose={handleRequestClose}
            switchLanguage={switchLanguage}
          />)}
      </ul>
    </CustomScrollbars>
  )
};

export default LanguageSwitcher;