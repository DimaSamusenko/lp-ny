'use client'

import React from 'react'

export function AddCss({ code = '' }) {
  return (
    <>
      <style jsx>{code}</style>
    </>
  )
}
