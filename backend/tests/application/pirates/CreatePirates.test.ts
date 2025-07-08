import { CreatePirate } from '../../../src/application/pirates/CreatePirate';
import { IPirateRepository } from '../../../src/domain/pirates/IPirateRepository';
import { Pirate } from '../../../src/domain/pirates/Pirate';

describe('CreatePirate', () => {
  let createPirate: CreatePirate;
  let mockPirateRepository: jest.Mocked<IPirateRepository>;

  beforeEach(() => {
    mockPirateRepository = {
      getAll: jest.fn(),
      save: jest.fn(),
    };

    createPirate = new CreatePirate(mockPirateRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('execute', () => {
    it('should create and save a pirate with the given name', async () => {
      // Arrange
      const pirateName = 'Monkey D. Luffy';
      mockPirateRepository.save.mockResolvedValue();

      // Act
      await createPirate.execute(pirateName);

      // Assert
      expect(mockPirateRepository.save).toHaveBeenCalledTimes(1);
      expect(mockPirateRepository.save).toHaveBeenCalledWith(
        expect.any(Pirate)
      );
      
      // Verificar que el pirata creado tiene el nombre correcto
      const savedPirate = mockPirateRepository.save.mock.calls[0][0];
      expect(savedPirate.name).toBe(pirateName);
    });

    it('should create a new Pirate instance with the provided name', async () => {
      // Arrange
      const pirateName = 'Roronoa Zoro';
      mockPirateRepository.save.mockResolvedValue();

      // Act
      await createPirate.execute(pirateName);

      // Assert
      const savedPirate = mockPirateRepository.save.mock.calls[0][0];
      expect(savedPirate).toBeInstanceOf(Pirate);
      expect(savedPirate.name).toBe(pirateName);
    });

    it('should handle repository save errors', async () => {
      // Arrange
      const pirateName = 'Portgas D. Ace';
      const errorMessage = 'Database connection failed';
      mockPirateRepository.save.mockRejectedValue(new Error(errorMessage));

      // Act & Assert
      await expect(createPirate.execute(pirateName)).rejects.toThrow(errorMessage);
      expect(mockPirateRepository.save).toHaveBeenCalledTimes(1);
    });

    it('should handle empty name', async () => {
      // Arrange
      const pirateName = '';
      mockPirateRepository.save.mockResolvedValue();

      // Act
      await createPirate.execute(pirateName);

      // Assert
      expect(mockPirateRepository.save).toHaveBeenCalledTimes(1);
      const savedPirate = mockPirateRepository.save.mock.calls[0][0];
      expect(savedPirate.name).toBe('');
    });

    it('should handle special characters in name', async () => {
      // Arrange
      const pirateName = 'Nico Robin "Devil Child"';
      mockPirateRepository.save.mockResolvedValue();

      // Act
      await createPirate.execute(pirateName);

      // Assert
      expect(mockPirateRepository.save).toHaveBeenCalledTimes(1);
      const savedPirate = mockPirateRepository.save.mock.calls[0][0];
      expect(savedPirate.name).toBe(pirateName);
    });
  });
});