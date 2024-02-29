import { Box } from "@mui/material"
import React from "react"

const AiHelperMessage = ({message}: {message:  {
    role: string;
    content: string;
}}) => {
    console.log("🚀 ~ role:", message.role)

  return (
    <Box className='ai-helper-message__wrapper' sx={{ 
      width: '100%',
      height: 'auto',
      padding: '5px 0',
      display: 'flex',
      gap: '10px'
      }}>
        <Box
          className='ai-helper-message__icon'
          sx={{
            textAlign: 'center',
            display: 'flex',
            maxWidth: '25px',
            width: '100%',
            height: '25px',
            alignItems: 'center',
            justifyContent: "center",
            order: message.role !== 'user' ? '1' : '',
            borderRadius: '50%',
            opacity: '0.2',
            background: 'blue'
          }}
        >
          <span>Av</span>
        </Box>
      <Box
        className='ai-helper-message__text'
        sx={{textAlign: message.role !== 'user' ? 'right' : 'left',}}
      >
        <Box sx={{
          fontWeight: 'bold', 
          textAlign: message.role !== 'user' ? 'right' : 'left',
          padding: '5px 0 0 0',
          marginBottom: '10px',
          }}>
            {message.role !== 'user' ? 'You' : 'AI Helper'}</Box>
        {message.content}
      </Box>
    </Box>
  )
}

export default AiHelperMessage