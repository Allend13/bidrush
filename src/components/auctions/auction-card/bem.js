import BEM from 'modules/bem-classnames'

const auctionCardBEM = {
  auctionCard: {
    class: 'auction-card',
    modificators: ['join', 'precap', 'race'],


    gallery: {
      class: 'gallery',
      galleryItem: {
        class: 'item',
      },
      galleryImg: {
        class: 'img',
      },
      galleryCurrentImg: {
        class: 'current-img',
      },
    },


    hr: {
      class: 'hr',
    },


    item: {
      class: 'item',
      itemTitle: {
        class: 'title',
      },
      itemDescription: {
        class: 'description',
      },
    },


    auctionStat: {
      class: 'status',
      itemPrice: {
        class: 'item-price',
        itemPriceAmount: {
          class: 'amount',
        },
      },
      statProgress: {
        class: 'progress',
        statProgressAmount: {
          class: 'amount',
        },
      },
      statStage: {
        class: 'stage',
      },
    },


    party: {
      class: 'party',
      player: {
        class: 'player',
        modificators: ['leader', 'total'],
        playerImg: {
          class: 'img',
        },
        playerName: {
          class: 'name',
        },
      },
    },


    kenny: {
      class: 'kenny',
    },


    actions: {
      class: 'actions',
      actionsBtn: {
        class: 'btn',
        modificators: ['invite', 'join', 'bid', 'bid-add', 'bid-remove'],
      },
      bidsDone: {
        class: 'bids-done',
        bidsDoneAmount: {
          class: 'amount',
        },
      },
      race: {
        class: 'race',
        raceInfo: {
          class: 'info',
          raceInfoLabel: {
            class: 'label',
          },
          raceTimer: {
            class: 'timer',
          },
          raceBidsLeft: {
            class: 'bids-left',
          },
        },
        raceBid: {
          class: 'bid',
          raceBidBtn: {
            class: 'btn',
          },
        },
      },
    },


    precapInfo: {
      class: 'precap-info',
      precapInfoRow: {
        class: 'row',
      },
      precapInfoLeft: {
        class: 'left-col',
      },
      precapInfoRight: {
        class: 'right-col',
      },
    },


    finish: {
      class: 'finish',
      modificators: ['winner', 'looser'],
      finishHeader: {
        class: 'header',
      },
      finishPrizeIcon: {
        class: 'prize-icon',
      },
      finishModal: {
        class: 'modal',
      },
    },

  },
}

BEM.addBEMComponent(auctionCardBEM)
