import FuseScrollbars from '@fuse/core/FuseScrollbars';
import { styled } from '@mui/material/styles';
import clsx from 'clsx';
import { forwardRef, memo, useImperativeHandle, useRef } from 'react';
import GlobalStyles from '@mui/material/GlobalStyles';
import FusePageCardedSidebar from './FusePageCardedSidebar';
import FusePageCardedHeader from './FusePageCardedHeader';

const headerHeight = 120;
const toolbarHeight = 64;
const Root = styled('div')(({ theme, ...props }) => ({
  display: 'flex',
  flexDirection: 'column',
  minWidth: 0,
  minHeight: '100%',
  position: 'relative',
  flex: '1 1 auto',
  width: '100%',
  height: 'auto',
  backgroundColor: theme.palette.background.default,
  '& .FusePageCarded-scroll-content': {
    height: '100%',
  },
  '& .FusePageCarded-wrapper': {
    display: 'flex',
    flexDirection: 'row',
    flex: '1 1 auto',
    zIndex: 2,
    maxWidth: '100%',
    minWidth: 0,
    height: '100%',
    backgroundColor: theme.palette.background.paper,
    ...(props.scroll === 'content' && {
      position: 'absolute',
      top: 0,
      bottom: 0,
      right: 0,
      left: 0,
      overflow: 'hidden',
    }),
  },
  '& .FusePageCarded-contentWrapper': {
    display: 'flex',
    flexDirection: 'column',
    flex: '1 1 auto',
    overflowX: 'auto', // Enable horizontal scrolling
    overflowY: 'auto', // Enable vertical scrolling
    WebkitOverflowScrolling: 'touch',
    zIndex: 9999,
  },
  '& .FusePageCarded-content': {
    flex: '1 0 auto',
    overflowX: 'auto', // Enable horizontal scrolling for content
    overflowY: 'auto', // Enable vertical scrolling for content
  },
}));

const FusePageCarded = forwardRef((props, ref) => {
  const {
    scroll = 'page',
    className,
    header,
    content,
    leftSidebarContent,
    rightSidebarContent,
    leftSidebarOpen = false,
    rightSidebarOpen = false,
    rightSidebarWidth = 240,
    leftSidebarWidth = 240,
    leftSidebarVariant = 'permanent',
    rightSidebarVariant = 'permanent',
    rightSidebarOnClose,
    leftSidebarOnClose,
  } = props;

  const leftSidebarRef = useRef(null);
  const rightSidebarRef = useRef(null);
  const rootRef = useRef(null);

  useImperativeHandle(ref, () => ({
    rootRef,
    toggleLeftSidebar: (val) => {
      leftSidebarRef.current.toggleSidebar(val);
    },
    toggleRightSidebar: (val) => {
      rightSidebarRef.current.toggleSidebar(val);
    },
  }));

  return (
    <>
      <GlobalStyles
        styles={() => ({
          ...(scroll !== 'page' && {
            '#fuse-toolbar': {
              position: 'static',
            },
            '#fuse-footer': {
              position: 'static',
            },
          }),
          ...(scroll === 'page' && {
            '#fuse-toolbar': {
              position: 'sticky',
              top: 0,
            },
            '#fuse-footer': {
              position: 'sticky',
              bottom: 0,
            },
          }),
        })}
      />
      <Root
        className={clsx(
          'FusePageCarded-root',
          `FusePageCarded-scroll-${props.scroll}`,
          className
        )}
        ref={rootRef}
        scroll={scroll}
        leftSidebarWidth={leftSidebarWidth}
        rightSidebarWidth={rightSidebarWidth}>
        {header && <FusePageCardedHeader header={header} />}

        <div className='container relative z-10 flex h-full flex-auto flex-col overflow-hidden rounded-t-16 shadow-1'>
          <div className='FusePageCarded-wrapper'>
            {leftSidebarContent && (
              <FusePageCardedSidebar
                position='left'
                variant={leftSidebarVariant}
                ref={leftSidebarRef}
                open={leftSidebarOpen}
                onClose={leftSidebarOnClose}>
                {leftSidebarContent}
              </FusePageCardedSidebar>
            )}

            <FuseScrollbars
              className='FusePageCarded-contentWrapper'
              enable={scroll === 'content'}
              style={{ overflowX: 'auto', overflowY: 'auto' }} // Enable both horizontal and vertical scrolling
            >
              {content && (
                <div className={clsx('FusePageCarded-content')}>{content}</div>
              )}
            </FuseScrollbars>

            {rightSidebarContent && (
              <FusePageCardedSidebar
                position='right'
                variant={rightSidebarVariant || 'permanent'}
                ref={rightSidebarRef}
                open={rightSidebarOpen}
                onClose={rightSidebarOnClose}>
                {rightSidebarContent}
              </FusePageCardedSidebar>
            )}
          </div>
        </div>
      </Root>
    </>
  );
});

export default memo(styled(FusePageCarded)``);
