const { loadFixture } = require('@nomicfoundation/hardhat-network-helpers');
const { assert } = require('chai');

describe('Game5', function () {
  async function deployContractAndSetVariables() {
    const Game = await ethers.getContractFactory('Game5');
    const game = await Game.deploy();

    let found = false;

    let signer = ethers.provider.getSigner(0);

    for (i = 0; i < 200; i++) {
      signer = ethers.provider.getSigner(i);
      const address = await signer.getAddress();
      if (address.startsWith("0x00")) {
        break;
      }
    }

    return { game, signer };
  }
  it('should be a winner', async function () {
    const { game, signer } = await loadFixture(deployContractAndSetVariables);

    // good luck
    await game.connect(signer).win();

    // leave this assertion as-is
    assert(await game.isWon(), 'You did not win the game');
  });
});
