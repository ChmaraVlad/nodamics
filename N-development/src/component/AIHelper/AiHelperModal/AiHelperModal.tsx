import { Box, Input,  } from "@mui/material"
import React from "react"

import AiHelperMessage from "./AiHelperMessage/AiHelperMessage";
import AiHelperForm from "./AiHelperForm/AiHelperForm";

const AiHelperModal = () => {
  const messagesArrayMocked = [
    {
    role: 'user',
    content: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quia autem consequuntur, dolore consectetur eaque repudiandae reprehenderit cumque! At ipsa ab, a assumenda asperiores, consequatur libero illum doloremque voluptas quis rem.',
  },
    {
    role: 'assistant',
    content: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quia autem consequuntur, dolore consectetur eaque repudiandae reprehenderit cumque! At ipsa ab, a assumenda asperiores, consequatur libero illum doloremque voluptas quis rem.',
  },
    {
    role: 'user',
    content: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quia autem consequuntur, dolore consectetur eaque repudiandae reprehenderit cumque! At ipsa ab, a assumenda asperiores, consequatur libero illum doloremque voluptas quis rem.',
  },
    {
    role: 'assistant',
    content: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quia autem consequuntur, dolore consectetur eaque repudiandae reprehenderit cumque! At ipsa ab, a assumenda asperiores, consequatur libero illum doloremque voluptas quis rem.',
  },
    {
    role: 'user',
    content: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quia autem consequuntur, dolore consectetur eaque repudiandae reprehenderit cumque! At ipsa ab, a assumenda asperiores, consequatur libero illum doloremque voluptas quis rem.',
  },
    {
    role: 'assistant',
    content: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quia autem consequuntur, dolore consectetur eaque repudiandae reprehenderit cumque! At ipsa ab, a assumenda asperiores, consequatur libero illum doloremque voluptas quis rem.',
  },
    {
    role: 'user',
    content: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quia autem consequuntur, dolore consectetur eaque repudiandae reprehenderit cumque! At ipsa ab, a assumenda asperiores, consequatur libero illum doloremque voluptas quis rem.',
  },
    {
    role: 'assistant',
    content: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quia autem consequuntur, dolore consectetur eaque repudiandae reprehenderit cumque! At ipsa ab, a assumenda asperiores, consequatur libero illum doloremque voluptas quis rem.',
  },
    {
    role: 'user',
    content: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quia autem consequuntur, dolore consectetur eaque repudiandae reprehenderit cumque! At ipsa ab, a assumenda asperiores, consequatur libero illum doloremque voluptas quis rem.',
  },
    {
    role: 'assistant',
    content: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quia autem consequuntur, dolore consectetur eaque repudiandae reprehenderit cumque! At ipsa ab, a assumenda asperiores, consequatur libero illum doloremque voluptas quis rem.',
  },
    {
    role: 'user',
    content: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quia autem consequuntur, dolore consectetur eaque repudiandae reprehenderit cumque! At ipsa ab, a assumenda asperiores, consequatur libero illum doloremque voluptas quis rem.',
  },
    {
    role: 'assistant',
    content: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quia autem consequuntur, dolore consectetur eaque repudiandae reprehenderit cumque! At ipsa ab, a assumenda asperiores, consequatur libero illum doloremque voluptas quis rem.',
  },
]

  return (
    <>
      <Box className='ai-helper-modal__wrapper' sx={{ 
        width: '100%',
        height: 'calc(100% - 40px)',
        fontSize: '12px',
        color: '#ffffff',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        overflow: 'auto',
        marginBottom: '15px'
        }}>
          {messagesArrayMocked.map((message, index) => <AiHelperMessage message={message} key={index} />)}
      </Box>
      <AiHelperForm />
    </>
  )
}

export default AiHelperModal