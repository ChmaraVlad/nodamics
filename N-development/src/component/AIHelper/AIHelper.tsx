import { Box, Fade, Input, Paper, Popper } from "@mui/material"
import React, { useCallback } from "react"
import { AiHelperStarIcon } from "../../assets/svg/AiHelperStarIcon";
import AiHelperModal from "./AiHelperModal/AiHelperModal";

const AIHelper = () => {


  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const popoverId = open ? '#ai-helper-popover-id' : undefined

  const handleClick = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
    setOpen((prev) => !prev);
  }, [open])

  return (
    <Box className='ai-helper__wrapper' sx={{ 
      width: 100,
      height: 'auto',
      fontSize: '12px',
      padding: '10px 20px',
      color: '#ffffff',
      position: 'absolute',
      bottom: '15px',
      right: '70px',
      background: '#3D3D3D',
      borderRadius: '5px',
      zIndex: 2,
      pointerEvents: 'all',
      }}>
        <Box
          className='ai-helper__button'
          onClick={handleClick}
          aria-describedby={popoverId}
          sx={{
            textAlign: 'center',
            display: 'flex',
            alignItems: 'center',
            justifyContent: "space-between",
            cursor: 'pointer'
          }}
        >
          <AiHelperStarIcon />
          <Box>AI Helper</Box>
        </Box>
      <Popper
        className='ai-helper__popper'
        sx={{ 
          zIndex: 2,
          top: 0,
          inset: 'auto 70px 60px auto !important',
          transform: 'translate(0, 0) !important',
          position: 'absolute',
          height: '100%',
          maxHeight: '80vh',
          background: '#3D3D3D',
          overflow: 'hidden',
          padding: '10px',
          width: '100%',
          maxWidth: '400px',
          borderRadius: '10px'
        }}
        open={open}
        anchorEl={anchorEl}
        id={popoverId}
        placement={'top'}
        transition
      >
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}
          >
            <Paper className="ai-helper-modal" sx={{
              width: '100%',
              right: '50px',
              height: '100%',
              boxShadow: 'none',
              background: 'transparent'
            }}>
              <AiHelperModal />
            </Paper>
          </Fade>
        )}
      </Popper>
    </Box>
  )
}

export default AIHelper