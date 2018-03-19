var {generateMessage} = require('./message');

describe('generateMessage', () => {
    it('should generate correct message object', () => {
        var from = 'Jen';
        var text = 'Some message';
        var message = generateMessage(from, text);
        expect(Object.keys(message).sort()).toEqual(['from', 'text', 'createdAt'].sort());
    });
});
