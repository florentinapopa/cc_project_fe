import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ListsComponent() {
    const [entities, setEntities] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            const result = await axios.get(
                `http://localhost:8080/entities`,
            );

            if (result.data.entities) {
                setEntities(result.data.entities);
            }
        };

        fetchData();
    }, []);

    const [categories, setCategories] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            const result = await axios.get(
                `http://localhost:8080/categories`,
            );

            if (result.data.categories) {
                setCategories(result.data.categories);
            }
        };

        fetchData();
    }, []);

    return (
        <div id="entitiesList">
            <div className='text-2xl font-bold mb-4'>Latest entities</div>
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
                    <span>No entities yet</span>
                }
            </ul>
            <div className='text-2xl font-bold mb-4 mt-10'>Latest categories</div>
            <ul className="-mb-8 max-h-96 overflow-auto">
                
                {categories.length ? categories.map((category, categoryIdx) => (
                    <li key={category.categoryID}>
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
                    <span>No categories yet</span>
                }
            </ul>
        </div>
    );
}

export default ListsComponent
