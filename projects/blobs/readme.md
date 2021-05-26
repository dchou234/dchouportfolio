Daniel Chou A7

I modified Professor Compton's fish template as starter code.

This is a mini blob pet creator, that takes some elements from Kate's code.
Size and Color are fairly self explanatory (changing the size and color respectively),
with the others explained below:

Spikes and SpikeSize: Spikes determines the number of spikes that the blob has, while Spike size
determines the size of each spike on the blob.

InnerColor: Determines the size of the inside blobs used to draw the blob pets. This basically
determines the number of colors the blob pet is made out of.

Noise: this is mostly leftover from Kate's code (deformation), but it lets the spikes have a little deviation
using noise. (The spike orientation slightly changes, I toned it down since I wanted to keep the blobs
mostly symmetric.)

Quick Note, the app must be in static mode for the landmarks to work, as random doesn't let you manually change it.
