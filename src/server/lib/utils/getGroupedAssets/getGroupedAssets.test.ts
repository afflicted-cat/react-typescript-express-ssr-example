import { getGroupedAssets } from './getGroupedAssets';

describe('getGroupedAssets', () => {
  it('groups assets by extension', () => {
    const inputValues = {
      file1: 'file1.exe',
      file2: 'file2.exe'
    };

    const result = getGroupedAssets(inputValues);

    expect(result).toEqual({
      exe: ['/file1.exe', '/file2.exe']
    });
  });

  it('handles asset lists correctly', () => {
    const inputValues = {
      group1: ['group1.css', 'group1.js'],
      group2: ['group2.css', 'group2.js']
    };

    const result = getGroupedAssets(inputValues);

    expect(result).toEqual({
      css: ['/group1.css', '/group2.css'],
      js: ['/group1.js', '/group2.js']
    });
  });

  it('does not change absolute paths in assets', () => {
    const inputValues = {
      file: '/dist/file.ai'
    };

    const result = getGroupedAssets(inputValues);

    expect(result).toEqual({
      ai: ['/dist/file.ai']
    });
  });

  it('converts non-absolute paths in asses into absolute', () => {
    const inputValues = {
      file: 'dist/file.ai'
    };

    const result = getGroupedAssets(inputValues);

    expect(result).toEqual({
      ai: ['/dist/file.ai']
    });
  });

  it('correctly handles complex extensions in asset names', () => {
    const inputValues = {
      file: 'file.tar.gz'
    };

    const result = getGroupedAssets(inputValues);

    expect(result).toEqual({
      gz: ['/file.tar.gz']
    });
  });
});
