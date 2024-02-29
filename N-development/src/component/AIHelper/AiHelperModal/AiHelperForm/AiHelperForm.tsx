import { Box, Button, Input } from "@mui/material"
import React from "react"
import { useForm } from "react-hook-form";
import { FormText } from "../../../base/FormInput";

const AiHelperForm = () => {

    const form = useForm({});

    const onSubmit = async (data) => {
        console.log("🚀 ~ onSubmit ~ data:", data)
    }


  return (
    <Box className="ai-helper-form" sx={{
        background: 'black',
        position: 'absolute',
        bottom: '0px',
        left: '0px',
        right: '0px',
        height: '40px',
        }}>
          <form className="ai-helper-form__content" 
            onSubmit={form.handleSubmit(onSubmit)}>
            <Input sx={{
              width: 'calc(100% - 65px)',
              height: '100%',
              padding: '0 20px'
            }}
              placeholder="How can i help you?"
            />
            <FormText sx={{
              width: 'calc(100% - 65px)',
              height: '100%',
              padding: '0 20px'
            }} label="ai-helper" placeholder={'Ask me anything'} form={form} name={'ai-helper'}/>
            <Button sx={{
              position: 'absolute',
              top: '0px',
              bottom: '0px',
              right: '0px',
              color: '#fff',
              "&:hover": {
                backgroundColor: 'grey !important'
              },
            }}
            type="submit"
            >
              Send
              </Button>
          </form>
      </Box>
  )
}

export default AiHelperForm