const mapLayers = [
  [
    {
        "id": "highlight",
        "type": "fill",
        "source": "highlight",
        "layout": {},
        "paint": {
          "fill-outline-color": "#484896",
          "fill-color": "#6e599f",
          "fill-opacity": 0.75
        }
    },
    ''
  ],
  [
    {
        "id": "county",
        "type": "fill",
        "source": "maps",
        "source-layer":"SVI_County",
        "maxzoom": 10,
        paint: {
          'fill-color': {
              property: 'F_TOTAL',
              type: 'categorical',
              stops: [
                [1, '#ffffd9'],
                [2, '#edf8b1'],
                [3, '#c7e9b4'],
                [4, '#7fcdbb'],
                [5, '#41b6c4'],
                [6, '#1d91c0'],
                [7, '#225ea8'],
                [9, '#0c2c84']
              ]
          },
          'fill-opacity': {
            stops:[[0, 0.5], [8, 0.5], [10, 0]]
          }
      }
    },
    "airport-label"
  ],
  [
    {
        "id": "tract",
        "type": "fill",
        "source": "maps",
        "source-layer":"SVI_Tract",
        "minzoom": 8,
        paint: {
          'fill-color': {
              property: 'F_TOTAL',
              type: 'categorical',
              stops: [
                 [1, '#ffffd9'],
                [2, '#edf8b1'],
                [3, '#c7e9b4'],
                [4, '#7fcdbb'],
                [5, '#41b6c4'],
                [6, '#1d91c0'],
                [7, '#225ea8'],
                [9, '#253494'],
                [10, '#081d58']
              ]
          },
          'fill-opacity': {
            stops:[[0, 0], [8, 0], [10, 0.5]]
          }
        }
    },
    "county"
  ],
  [
    {
        "id": "county-socio",
        "type": "fill",
        "source": "maps",
        "source-layer":"SVI_County",
        "maxzoom": 20,
        layout: {
          visibility:'none'
        },
        paint: {
          'fill-color': {
              property: 'RPL_THEME1',
              type: 'categorical',
              stops: [
                   [1, '#f0f9e8'],
                        [2, '#bae4bc'],
                        [3, '#7bccc4'],
                        [4, '#2b8cbe']]
          },
          'fill-opacity': {
            stops:[[0,0.5],[8,0.5],[10,0]]
          }
        }
    },
    "airport-label"
  ],
  [
    {
        "id": "tract-socio",
        "type": "fill",
        "source": "maps",
        "source-layer":"SVI_Tract",
        "minzoom": 0,
        layout: {
          visibility:'none'
        },
        paint: {
                'fill-color': {
                    property: 'RPL_THEME1',
                    type: 'categorical',
                    stops: [
                        [1, '#f0f9e8'],
                        [4, '#bae4bc'],
                        [6, '#7bccc4'],
                        [8, '#2b8cbe']]
                },
                'fill-opacity': {
                  stops:[[0, 0], [8, 0], [10, 0.5]]
                }
            }

    },
    "county"
  ],
  [
    {
        "id": "county-household",
        "type": "fill",
        "source": "maps",
        "source-layer":"SVI_County",
        "maxzoom": 20,
        layout: {
          visibility:'none'
        },
        paint: {
          'fill-color': {
            property: 'RPL_THEME2',
            type: 'categorical',
            stops: [
                  [1, '#f0f9e8'],
                  [2, '#bae4bc'],
                  [3, '#7bccc4'],
                  [4, '#2b8cbe']]
          },
          'fill-opacity': {
            stops:[[0, 0.5], [8, 0.5], [10, 0]]
          }
        }
    },
    "airport-label"
  ],
  [
    {
        "id": "tract-household",
        "type": "fill",
        "source": "maps",
        "source-layer":"SVI_Tract",
        "minzoom": 0,
        layout: {
          visibility:'none'
        },
        paint: {
          'fill-color': {
              property: 'RPL_THEME2',
              type: 'categorical',
              stops: [
                [1, '#f0f9e8'],
                [2, '#bae4bc'],
                [3, '#7bccc4'],
                [4, '#2b8cbe']
              ]
          },
          'fill-opacity': {
            stops:[[0, 0], [8, 0], [10, 0.5]]
          }
        }
    },
    "county"
  ],
  [
    {
          "id": "county-minority",
          "type": "fill",
          "source": "maps",
          "source-layer":"SVI_County",
          "maxzoom": 20,
          layout: {
            visibility:'none'
          },
          paint: {
            'fill-color': {
              property: 'RPL_THEME3',
              type: 'categorical',
              stops: [
                [1, '#f0f9e8'],
                [2, '#bae4bc'],
                [3, '#7bccc4'],
                [4, '#2b8cbe']
              ]
            },
            'fill-opacity': {
              stops:[[0,0.5],[8,0.5],[10,0]]
            }
        }
      },
      "airport-label"
  ],
  [
    {
        "id": "tract-minority",
        "type": "fill",
        "source": "maps",
        "source-layer":"SVI_Tract",
        "minzoom": 0,
        layout: {
          visibility:'none'
        },
        paint: {
          'fill-color': {
            property: 'RPL_THEME3',
            type: 'categorical',
            stops: [
              [1, '#f0f9e8'],
              [2, '#bae4bc'],
              [3, '#7bccc4'],
              [4, '#2b8cbe']
            ]
          },
          'fill-opacity': {
            stops:[[0,0],[8,0],[10,0.5]]
          }
        }
    },
    "county"
  ],
  [
    {
        "id": "county-housing",
        "type": "fill",
        "source": "maps",
        "source-layer":"SVI_County",
        "maxzoom": 20,
        layout: {
          visibility:'none'
        },
        paint: {
          'fill-color': {
            property: 'RPL_THEME4',
            type: 'categorical',
            stops: [
              [1, '#f0f9e8'],
              [2, '#bae4bc'],
              [3, '#7bccc4'],
              [4, '#2b8cbe']
            ]
          },
          'fill-opacity': {
            stops:[[0,0.5],[8,0.5],[10,0]]
          }
      }
    },
    "airport-label"
  ],
  [
    {
        "id": "tract-housing",
        "type": "fill",
        "source": "maps",
        "source-layer":"SVI_Tract",
        "minzoom": 0,
        layout: {
          visibility:'none'
        },
        paint: {
          'fill-color': {
            property: 'RPL_THEME4',
            type: 'categorical',
            stops: [
              [1, '#f0f9e8'],
              [2, '#bae4bc'],
              [3, '#7bccc4'],
              [4, '#2b8cbe']
            ]
          },
          'fill-opacity': {
            stops:[[0,0],[8,0],[10,0.5]]
          }
        }
    },
    "county"
  ],
  [
    {
        "id": "county-hazard",
        "type": "fill",
        "source": "maps",
        "source-layer":"SVI_County",
        "maxzoom": 20,
        layout: {
          visibility:'none'
        },
        paint: {
          'fill-color': {
            property: 'T_N_H_R',
            stops: [
                [8, '#ffffcc'],
                [16, '#ffeda0'],
                [24, '#fed976'],
                [32, '#feb24c'],
                [40, '#fd8d3c'],
                [48, '#fc4e2a'],
                [56, '#e31a1c'],
                [64, '#b10026'],
                [72, '#800026']]
          },
          'fill-opacity': 0.5
        }
    },
    "airport-label"
  ],
  [
    {
         "id": "county-hurricane",
         "type": "fill",
         "source": "maps",
         "source-layer":"SVI_County",
         "maxzoom": 20,
         layout: {
           visibility:'none'
         },
         paint: {
           'fill-color': {
             property: 'H_S_S_R',
             stops: [
                 [3, '#ffffcc'],
                 [6, '#ffeda0'],
                 [9, '#fed976'],
                 [12, '#feb24c'],
                 [15, '#fd8d3c'],
                 [18, '#fc4e2a'],
                 [21, '#e31a1c'],
                 [24, '#b10026'],
                 [27, '#800026']]
           },
           'fill-opacity': 0.5
         }
     },
     "airport-label"
  ],
  [
    {
          "id": "county-flood",
          "type": "fill",
          "source": "maps",
          "source-layer":"SVI_County",
          "maxzoom": 20,
          layout: {
            visibility:'none'
          },
          paint: {
            'fill-color': {
              property: 'Fld_R_I',
              stops: [
                  [3, '#ffffcc'],
                  [6, '#ffeda0'],
                  [9, '#fed976'],
                  [12, '#feb24c'],
                  [15, '#fd8d3c'],
                  [18, '#fc4e2a'],
                  [21, '#e31a1c'],
                  [24, '#b10026'],
                  [27, '#800026']]
            },
            'fill-opacity': 0.5
          }
      },
      "airport-label"
  ],
  [
    {
          "id": "county-hail",
          "type": "fill",
          "source": "maps",
          "source-layer":"SVI_County",
          "maxzoom": 20,
          layout: {
            visibility:'none'
          },
          paint: {
            'fill-color': {
              property: 'Hl_Rs_I',
              stops: [
                  [3, '#ffffcc'],
                  [6, '#ffeda0'],
                  [9, '#fed976'],
                  [12, '#feb24c'],
                  [15, '#fd8d3c'],
                  [18, '#fc4e2a'],
                  [21, '#e31a1c'],
                  [24, '#b10026'],
                  [27, '#800026']]
            },
            'fill-opacity': 0.5
          }
      },
      "airport-label"
  ],
  [
    {
        "id": "county-earthquake",
        "type": "fill",
        "source": "maps",
        "source-layer":"SVI_County",
        "maxzoom": 20,
        layout: {
          visibility:'none'
        },
        paint: {
          'fill-color': {
            property: 'Ert_R_I',
            stops: [
                [3, '#ffffcc'],
                [6, '#ffeda0'],
                [9, '#fed976'],
                [12, '#feb24c'],
                [15, '#fd8d3c'],
                [18, '#fc4e2a'],
                [21, '#e31a1c'],
                [24, '#b10026'],
                [27, '#800026']]
          },
          'fill-opacity': 0.5
        }
    },
    "airport-label"
  ],
  [
    {
        "id": "county-tornado",
        "type": "fill",
        "source": "maps",
        "source-layer":"SVI_County",
        "maxzoom": 20,
        layout: {
          visibility:'none'
        },
        paint: {
          'fill-color': {
            property: 'Trn_R_I',
            stops: [
                [3, '#ffffcc'],
                [6, '#ffeda0'],
                [9, '#fed976'],
                [12, '#feb24c'],
                [15, '#fd8d3c'],
                [18, '#fc4e2a'],
                [21, '#e31a1c'],
                [24, '#b10026'],
                [27, '#800026']]
          },
          'fill-opacity': 0.5
        }
    },
      "airport-label"
  ],
  [
    {
        "id": "county-wildfire",
        "type": "fill",
        "source": "maps",
        "source-layer":"SVI_County",
        "maxzoom": 20,
        layout: {
          visibility:'none'
        },
        paint: {
          'fill-color': {
            property: 'Wld_R_I',
            stops: [
                [3, '#ffffcc'],
                [6, '#ffeda0'],
                [9, '#fed976'],
                [12, '#feb24c'],
                [15, '#fd8d3c'],
                [18, '#fc4e2a'],
                [21, '#e31a1c'],
                [24, '#b10026'],
                [27, '#800026']]
          },
          'fill-opacity': 0.5
        }
    },
    "airport-label"
  ]
]