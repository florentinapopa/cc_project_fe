import {React, useState} from 'react';
import axios from 'axios';
import { LANGUAGES_ARRAY } from '../../utils/constants';

function SubmitComponent() {
    const [entities, setEntities] = useState([]);
    const [categories, setCategories] = useState([]);

    const handleTextSubmit = async (e) => {
        const language = e.target.value;
        const text = document.getElementById('text').value;

     
            await axios.get(
                `http://localhost:8080/language/entities`,
                {params:{
                    language: language,
                    text: text
                }}, {
                    headers: {
                      'Content-Type': 'application/json'
                    }}).then(response => {

                         if(response.status === 406){
                            alert(`${response.data.message}`);
                        }
                    
                const entities = JSON.parse(JSON.stringify(response.data.entities))
                
                if(entities.length !== 0) {
                    setEntities(entities)
                }
            
                    }).catch(error => {
                        alert('Same language or missing text.')

                    });  
    }

    const handleTextSubmitForCatgories = async (e) => {
        
        const text = document.getElementById('text').value;

     
            await axios.get(
                `http://localhost:8080/language/categories`,
                {params:{
                   
                    text: text
                }}, {
                    headers: {
                      'Content-Type': 'application/json'
                    }}).then(response => {

                    
                const categories = JSON.parse(JSON.stringify(response.data.categories))
               
                if(categories.length !== 0) {
                    setCategories(categories)
                }
            
                    }).catch(error => {
                        alert('Missing text.')

                    });
               
            
        
    }

    const handleEntitiesSubmit = async (e) => {
     
            await axios.post(
                `http://localhost:8080/entities`,
                {
                    entities: entities
                }, {
                    headers: {
                      'Content-Type': 'application/json'
                    }}).then(response => {
                        const message = JSON.parse(JSON.stringify(response.data.message))
                             alert(`${message}`)
            
                    }).catch(error => {
                        alert('Server error.')

                    });  
    }

    const handleCategoriesSubmit = async (e) => {
     
        await axios.post(
            `http://localhost:8080/categories`,
            {
                categories: categories
            }, {
                headers: {
                  'Content-Type': 'application/json'
                }}).then(response => {
                    const message = JSON.parse(JSON.stringify(response.data.message))
                             alert(`${message}`)
        
                }).catch(error => {
                    alert('Server error.')

                });  
}

    return (
        <div id="SubmitComponent">
            <div className='text-2xl font-bold mb-4'>Add your text</div>
            <form className="w-full max-w-lg">
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full md:w-full px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="text">
                            Your text
                        </label>
                        <textarea
                            rows={4}
                            name="text"
                            id="text"
                            className="shadow-md focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-800 rounded-md p-5"
                            placeholder={'Add text here'} />
                    </div>
                </div>
            </form>

            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="text">
                            See entities
                        </label>

            {LANGUAGES_ARRAY.map((language, index) => {
                return (
                    <button
                        key={index}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-2 capitalize"
                        onClick={handleTextSubmit}
                        value={language}>
                        {language.toLowerCase()}
                    </button>
                )
            })}

                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="text">
                            See categories
                        </label>
                        <button
                        
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-2 capitalize"
                        onClick={handleTextSubmitForCatgories}
                        >
                        Categories
                    </button>

            <div className='mb-10'>
            <ul className="-mb-8 max-h-96 overflow-auto">
            {entities.length ? entities.map((entity, entityIdx) => (
                    <li key={entity.entityID}>
                        <div className="relative pb-8">
                            <div className="relative flex space-x-3">
                                <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                                    <p className="text-sm text-gray-500">
                                        <span className="font-medium text-gray-900">
                                            {`Entity: ${entity.entityName}`}
                                        </span>
                                        <span className="font-medium">
                                            {` has the type ${entity.entityType}.`}
                                        </span>
                                        {entity.url !== "" ? <a href={entity.url}>{` More information at ${entity.url}`}</a> : <span>No link found for entity.</span> }
                                    </p>
                                </div>
                            </div>
                        </div>
                    </li>
                )) :
                    <span className='mb-10'>No entities found</span>
                }
            </ul>
                {entities.length !==0 &&  (<button
                        
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-2 capitalize mt-10"
                        onClick={handleEntitiesSubmit}
                        >
                        Save entities
                    </button>)}
                    </div>
                    <ul className="-mb-8 max-h-96 overflow-auto">
            {categories.length ? categories.map((category, entityIdx) => (
                    <li key={category.categId}>
                        <div className="relative pb-8">
                            <div className="relative flex space-x-3">
                                <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                                    <p className="text-sm text-gray-500">
                                        <span className="font-medium text-gray-900">
                                            {`Category: ${category.categoryName}`}
                                        </span>
                                        <span className="font-medium">
                                            {` has a confidence of ${category.confidence}.`}
                                        </span>
                                       
                                    </p>
                                </div>
                            </div>
                        </div>
                    </li>
                )) :
                    <span className='mb-10'>No categories found</span>
                }
            </ul>
            {categories.length !== 0 &&  (<button
                        
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-2 capitalize"
                        onClick={handleCategoriesSubmit}
                        >
                        Save categories
                    </button>)}
        </div>
    );
}

export default SubmitComponent;