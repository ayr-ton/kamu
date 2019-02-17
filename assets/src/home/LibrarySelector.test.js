import React from 'react';
import { shallow } from 'enzyme';
import ListItem from '@material-ui/core/ListItem';
import { LibrarySelector } from './LibrarySelector';
import { getLibraries } from '../services/BookService';
import { setRegion } from '../services/ProfileService';

jest.mock('../services/BookService');
jest.mock('../services/ProfileService');

const history = { push: jest.fn() };

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
        getLibraries.mockResolvedValue(libraries);
        librarySelector = shallow(<LibrarySelector history={history} />);
    });

    it('should set the region in ProfileService when choosing a library', async () => {
        await librarySelector.instance()._loadLibraries();

        librarySelector.find(ListItem).first().simulate('click');

        expect(setRegion).toHaveBeenCalledWith('bh');
    });

    it('redirects to the library page when clicking', async () => {
        await librarySelector.instance()._loadLibraries();

        librarySelector.find(ListItem).simulate('click');

        expect(history.push).toHaveBeenCalledWith('/libraries/bh');
    });
});
