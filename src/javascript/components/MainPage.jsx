import React from 'react';
import Footer from './Footer';
import Header from './Header';
import ListsComponent from './ListsComponent';
import SubmitComponent from './SubmitComponent';

function MainPage() {
    return ( 
    <div id="MainPage">
        <Header/>
        <div className="flex max-w-7xl m-auto px-14 py-24">
        <div className='w-1/2 pr-5'>
                        <ListsComponent />
                    </div>
                    <div className='w-1/2 pl-5'>
                    <SubmitComponent/>
                    </div>
        </div>

        <Footer/>
    </div>
    );
}

export default MainPage;