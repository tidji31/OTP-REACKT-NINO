/* eslint-disable prettier/prettier */
/**
 * To customize certain UI features, create a file like this one and specify it
 * during build/start to override this default version of the file:
 *    yarn start --env.JS_CONFIG=/path/to/config.js
 */
import { ClassicLegIcon, ClassicModeIcon } from '@opentripplanner/icons'
import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

import {
  BatchResultsScreen,
  BatchRoutingPanel,
  BatchSearchScreen,
  MetroItinerary
} from '../lib/index'

const ItineraryBody = MetroItinerary
const LegIcon = ClassicLegIcon
const ModeIcon = ClassicModeIcon

/**
 * Composant pour écouter la langue active et appliquer dynamiquement le sens RTL ou LTR
 */
const LanguageWatcher = () => {
  // Récupère la locale active dans le store Redux d'OTP
  const currentLocale = useSelector((state) => state.otp?.config?.localization?.currentLocale || state.router?.location?.query?.locale || 'fr')

  useEffect(() => {
    const root = document.documentElement
    if (currentLocale === 'ar') {
      root.setAttribute('dir', 'rtl')
      root.setAttribute('lang', 'ar')
    } else {
      root.setAttribute('dir', 'ltr')
      root.setAttribute('lang', currentLocale)
    }
  }, [currentLocale])

  return null
}

/**
 * Composant de contrôle du thème géré en local (sans passer par le store Redux)
 */
const ThemeToggleControl = () => {
  const [themeMode, setThemeMode] = useState(() => {
    return localStorage.getItem('otp_theme') || 'light'
  })

  useEffect(() => {
    const root = document.documentElement
    if (themeMode === 'dark') {
      root.classList.add('dark')
      localStorage.setItem('otp_theme', 'dark')
    } else {
      root.classList.remove('dark')
      localStorage.setItem('otp_theme', 'light')
    }
  }, [themeMode])

  const toggleTheme = () => {
    setThemeMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'))
  }

  return (
    <div style={{ position: 'absolute', top: '10px', right: '10px', zIndex: 1000 }}>
      <button
        onClick={toggleTheme}
        style={{
          backgroundColor: themeMode === 'dark' ? '#2d3748' : '#ffffff',
          color: themeMode === 'dark' ? '#f7fafc' : '#2d3748',
          border: '1px solid #cbd5e0',
          borderRadius: '8px',
          padding: '8px 12px',
          cursor: 'pointer',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          fontWeight: 'bold',
          display: 'flex',
          alignItems: 'center',
          gap: '6px'
        }}
      >
        {themeMode === 'light' ? '🌙' : '☀️'}
      </button>
    </div>
  )
}

const ItineraryFooter = () => <div />

/**
 * On combine LanguageWatcher et ThemeToggleControl dans MainControls 
 * pour qu'ils soient tous les deux exécutés par l'application.
 */
const MainControls = () => (
  <>
    <LanguageWatcher />
    <ThemeToggleControl />
  </>
)

export function configure(otpConfig) {
  return {
    ItineraryBody,
    ItineraryFooter,
    LegIcon,
    MainControls,
    MainPanel: BatchRoutingPanel,
    MobileResultsScreen: BatchResultsScreen,
    MobileSearchScreen: BatchSearchScreen,
    ModeIcon
  }
}