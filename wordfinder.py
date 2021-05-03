#!/usr/bin/env pythong3

import sys

for word in sys.stdin:
    word = word.strip()
    if len(set(word)) == 7:
        print(word)