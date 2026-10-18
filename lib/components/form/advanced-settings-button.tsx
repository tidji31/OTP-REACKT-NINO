
import { ArrowRight } from '@styled-icons/fa-solid/ArrowRight'
import { ArrowLeft } from '@styled-icons/fa-solid/ArrowLeft'
import { FormattedMessage, useIntl } from 'react-intl'
import React from 'react'
import styled from 'styled-components'

interface Props {
  onClick: () => void
}

export const StyledTransparentButton = styled.button`
  align-items: center;
  justify-content: center;
  display: inline-flex;
  gap: 8px;
  padding: 8px 12px;

  background-color: var(--otp-surface-2, #f1f5f9);
  border: 1px solid var(--otp-border-color, #cbd5e1);
  border-radius: var(--otp-radius-sm, 8px);

  color: var(--otp-text-color, #0f172a) !important;
  font-family: inherit;
  font-size: 14px;
  font-weight: 600;
  line-height: 1.5;
  text-align: center;
  white-space: nowrap;

  cursor: pointer;
  transition:
    background-color 200ms ease-in-out,
    border-color 200ms ease-in-out,
    color 200ms ease-in-out;

  svg {
    display: block;
    width: 16px;
    height: 16px;
    fill: currentColor;
    color: inherit;
    flex-shrink: 0;
  }

  &:hover {
    background-color: var(--otp-accent-soft, rgba(59, 130, 246, 0.1));
    border-color: var(--otp-accent, #3b82f6);
    color: var(--otp-accent, #3b82f6) !important;
  }

  &:focus-visible {
    outline: 2px solid var(--otp-accent, #3b82f6);
    outline-offset: 2px;
  }

  &:active {
    transform: translateY(1px);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`

const AdvancedSettingsButton = ({ onClick }: Props): JSX.Element => {
  const intl = useIntl()
  const isRtl = intl.locale.toLowerCase().startsWith('ar')

  return (
    <StyledTransparentButton
      id="open-advanced-settings-button"
      onClick={onClick}
      type="button"
    >
      <FormattedMessage id="components.BatchSearchScreen.moreOptions" />
      {isRtl ? <ArrowLeft aria-hidden="true" size={16} /> : <ArrowRight aria-hidden="true" size={16} />}
    </StyledTransparentButton>
  )
}

export default AdvancedSettingsButton
