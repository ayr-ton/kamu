import React from 'react';
import LibrarySelector from './LibrarySelector';
import {shallow} from 'enzyme';
import { ListItem } from '@material-ui/core';
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

    it('should redirect to the library page when choosing a library', async () => {
        await librarySelector.instance()._loadLibraries();

        librarySelector.find(ListItem).first().simulate('click');

        expect(window.location.assign).toHaveBeenCalledWith('/libraries/bh');
    });
});