import React from 'react'

export const NotFound = () => {
  return (
    <div className="error-page">
      <h1>404</h1>
      <h2>Page Not Found</h2>
      <p>The page you requested could not be found.</p>
      <a href="/">Back to Home</a>
    </div>
  )
}
