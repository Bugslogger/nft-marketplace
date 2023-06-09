const { ethers } = require("ethers");

const NftMarket = artifacts.require("NftMarket");

contract("NftMarket", (accounts) => {
  let _contract = null;
  let _nftPrice = ethers.utils.parseEther("0.3").toString();
  let _listingPrice = ethers.utils.parseEther("0.025").toString();

  before(async () => {
    _contract = await NftMarket.deployed();
  });

  describe("Mint token", () => {
    const tokenURI = "https://test.com/";
    before(async () => {
      await _contract.mintToken(tokenURI, _nftPrice, {
        from: accounts[0],
        value: _listingPrice,
      });
    });

    it("owner of fist token should be accounts[0]", async () => {
      const owner = await _contract.ownerOf(1);
      //   assert(
      //     owner == "0x5E5Ab5dA881fce44DF9DC2caf8DAF041d25f386f",
      //     "owner of token is not matching address[0]"
      //   );

      assert.equal(
        owner,
        accounts[0],
        "owner of token is not matching address[0]"
      );
    });

    it("fist token should point to the correct tokenURI", async () => {
      const actualTokenURI = await _contract.tokenURI(1);
      // const invalidTokenURI = await _contract.tokenURI(2);
      assert.equal(actualTokenURI, tokenURI, "tokenURI is not correctly set");
    });

    it("Should not be possible to create NFT with usedd token URI", async () => {
      try {
        await _contract.mintToken(tokenURI, _nftPrice, {
          from: accounts[0],
        });
      } catch (error) {
        assert(error, "NFT is already minted with previously used token URI.");
      }
    });

    it("Should have one listed items.", async () => {
      const listedItemsCount = await _contract.listedItemsCount();

      assert.equal(
        listedItemsCount.toNumber(),
        1,
        "listed items count is not 1"
      );
    });

    it("Should have create NFT.", async () => {
      const nftItem = await _contract.getNftItem(1);

      assert.equal(nftItem.tokenId, 1, "nft token Id is not 1");
      assert.equal(nftItem.price, _nftPrice, "nft price is not correct");
      assert.equal(nftItem.creator, accounts[0], "creator is not account[0]");
      assert.equal(nftItem.isListed, true, "token is not listed");
    });
  });

  describe("Buy NFT", () => {
    console.log(typeof _nftPrice ,_nftPrice,accounts);
    before(async () => {
      await _contract.buyNft(1, {
        from: accounts[0],
        value: _nftPrice,
      });
    });

    it("should unlist the item", async () => {
      const listedItem = await _contract.getNftItem(1);
      assert.equal(listedItem.isListed, false, "Item is still listed");
    });

    it("should decrease listed items count", async () => {
      const listedItemsCount = await _contract.listedItemsCount();
      assert.equal(
        listedItemsCount.toNumber(),
        0,
        "Count has not been decrement"
      );
    });

    it("should change the owner", async () => {
      const currentOwner = await _contract.ownerOf(1);
      assert.equal(currentOwner, accounts[1], "Item is still listed");
    });
  });

  describe("Token transfers", () => {
    const tokenURI = "https://test-json-2.com";
    before(async () => {
      await _contract.mintToken(tokenURI, _nftPrice, {
        from: accounts[0],
        value: _listingPrice,
      });
    });

    it("should have two NFTs created", async () => {
      const totalSupply = await _contract.totalSupply();
      assert.equal(
        totalSupply.toNumber(),
        2,
        "Total supply of token is not correct"
      );
    });

    it("should be able to retreive nft by index", async () => {
      const nftId1 = await _contract.tokenByIndex(0);
      const nftId2 = await _contract.tokenByIndex(1);

      assert.equal(nftId1.toNumber(), 1, "Nft id is wrong");
      assert.equal(nftId2.toNumber(), 2, "Nft id is wrong");
    });

    it("should have one listed NFT", async () => {
      const allNfts = await _contract.getAllNftsOnSale();
      assert.equal(allNfts[0].tokenId, 2, "Nft has a wrong id");
    });

    it("account[1] should have one owned NFT", async () => {
      const ownedNfts = await _contract.getOwnedNfts({ from: accounts[1] });
      assert.equal(ownedNfts[0].tokenId, 1, "Nft has a wrong id");
    });

    it("account[0] should have one owned NFT", async () => {
      const ownedNfts = await _contract.getOwnedNfts({ from: accounts[0] });
      assert.equal(ownedNfts[0].tokenId, 2, "Nft has a wrong id");
    });
  });

  describe("Token transfer to new owner", () => {
    before(async () => {
      await _contract.transferFrom(accounts[0], accounts[1], 2);
    });

    it("accounts[0] should own 0 tokens", async () => {
      const ownedNfts = await _contract.getOwnedNfts({ from: accounts[0] });
      // console.log(ownedNfts);
      assert.equal(ownedNfts.length, 0, "Invalid length of tokens");
    });

    it("accounts[1] should own 2 tokens", async () => {
      const ownedNfts = await _contract.getOwnedNfts({ from: accounts[1] });
      // console.log(ownedNfts);
      assert.equal(ownedNfts.length, 2, "Invalid length of tokens");
    });
  });

  // describe("Burn Token", () => {
  //   const tokenURI = "https://test-json3.com";
  //   before(async () => {
  //     await _contract.mintToken(tokenURI, _nftPrice, {
  //       from: accounts[2],
  //       value: _listingPrice,
  //     });
  //   });

  //   it("account[2] should have one owned NFT", async () => {
  //     const ownedNfts = await _contract.getOwnedNfts({ from: accounts[2] });

  //     assert.equal(ownedNfts[0].tokenId, 3, "Nft has a wrong id");
  //   });

  //   it("account[2] should own 0 NFTs", async () => {
  //     await _contract.burnToken(3, { from: accounts[2] });
  //     const ownedNfts = await _contract.getOwnedNfts({ from: accounts[2] });

  //     assert.equal(ownedNfts.length, 0, "Invalid length of tokens");
  //   });
  // });

  describe("List an Nft", () => {
    before(async () => {
      await _contract.placeNftOnSale(1, _nftPrice, {
        from: accounts[1],
        value: _listingPrice,
      });
    });

    it("should have two listed items", async () => {
      const listedNfts = await _contract.getAllNftsOnSale();

      assert.equal(listedNfts.length, 2, "Invalid length of Nfts");
    });

    it("should set new listing price", async () => {
      await _contract.setListingPrice(_listingPrice, { from: accounts[0] });
      const listingPrice = await _contract.listingPrice();

      assert.equal(listingPrice.toString(), _listingPrice, "Invalid Price");
    });
  });
});
