import React, { useState } from 'react';
import { connect } from 'react-redux';

import Content from './article/common/Content';
import Nav from './nav/Nav';
import Header from './header/Header';
import Aside from './aside/Aside';

import { setTopBarLoading, dropTopBarLoading } from '../../redux/reducers/common/commonActionCreators';
import { useParams } from 'react-router';

const mapStateToProps = (state) => ({
  isTopBarLoading: state.common.isTopBarLoading
});
const mapDispatchToProps = (dispatch) => ({
  setTopBarLoading: () => dispatch(setTopBarLoading()),
  dropTopBarLoading: () => dispatch(dropTopBarLoading())
});

function Main(props) {

  const params = useParams();
  const [url, setUrl] = useState();
  if (params['*'] !== url) {
    const promise = new Promise((resolve) => resolve());
    promise.then(props.dropTopBarLoading).then(props.setTopBarLoading);
    setUrl(params['*']);
  };

  return (
    <div className='
      flex flex-col min-h-screen w-full bg-gradient-to-r from-rose-200 to-pink-300
    '>
      <div className='
        flex flex-col items-center sticky h-0 w-full top-0
      '>
        <Header />
        <span className='
          invisible flex flex-raw h-0 w-0
          md:visible md:w-[768px]
          lg:w-[1024px] 
          xl:w-[1280px]
        '>
          <Nav />
          <span className='
            invisible w-0 
            md:visible md:w-[500px]
            lg:w-[600px]
            xl:w-[700px]
            '/>
          <Aside />
        </span>
      </div>
      <div className='
        flex flex-col items-center w-full h-full 
      '>
        <span className='h-16' />
        <span className='
          flex flex-row w-full
          md:w-[768px]
          lg:w-[1024px] 
          xl:w-[1280px]
        '>
          <span className='
            float-left invisible w-0
            md:visible md:w-[184px]
            lg:w-[212px]
            xl:w-[290px]
          ' />
          <div className='
            justify-items-center max-h-full w-full pt-4 
            md:w-[500px]
            lg:w-[600px]
            xl:w-[700px]
          '>
            <Content />
            <footer className='text-center'>
              FOOTER
            </footer>
          </div>
          <span className='
             float-right invisible w-0 
             lg:visible lg:w-[212px] 
             xl:w-[290px] 
          ' />
        </span>
      </div>

    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);