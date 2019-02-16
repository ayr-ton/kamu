import React from 'react';
import { shallow } from 'enzyme';
import { Link } from 'react-router-dom';
import ListItem from '@material-ui/core/ListItem';
import LibrarySelector from './LibrarySelector';
import { getLibraries } from '../services/BookService';
import { setRegion } from '../services/ProfileService';

jest.mock('../services/BookService');
jest.mock('../services/ProfileService');

describe('LibrarySelector', () => {
    let librarySelector;
    const libraries = {
        count: 1,
        next: null,
        previous: null,
        results: [
            {
                id: 1,
                url: "http://localhost:8000/api/libraries/bh/",
                name: "Belo Horizonte",
                slug: "bh",
            }
        ]
    };

    beforeEach(() => {
        window.location.assign = jest.fn();
        getLibraries.mockResolvedValue(libraries);
        librarySelector = shallow(<LibrarySelector />);
    });

    it('should set the region in ProfileService when choosing a library', async () => {
        await librarySelector.instance()._loadLibraries();

        librarySelector.find(ListItem).first().simulate('click');

        expect(setRegion).toHaveBeenCalledWith('bh');
    });

    it('should have a link to the library page ', async () => {
        await librarySelector.instance()._loadLibraries();

        const libraryItem = librarySelector.find(ListItem).first();

        expect(libraryItem.find(Link).props().to).toEqual('/libraries/bh');
    });
});