import ICompare from './ICompare'
import SFile from './SFile'
import Difference from './Difference'

/**
 * Class to represent a pure textual comparison between two SFiles
 * baseFile: The first file to be compared
 * diffFile: The second file to be compared
 */
export default class TextCompare implements ICompare {
    private baseFile: SFile
    private diffFile: SFile
    constructor(target: SFile, diff: SFile) {
        this.baseFile = target
        this.diffFile = diff
    }
    // Compare the two member SFiles, return a list of textual similarities in the form of Difference[]
    compare(): Difference[] {
        let baseString = sanitize(this.baseFile)
        let baseGrams = makeKGrams(baseString, 8)
        let baseHashGrams = hashGrams(baseGrams)
        let baseFingerPrints = getFingerprints(getJustHashes(baseHashGrams), 6)

        let targetString = sanitize(this.diffFile)
        let targetGrams = makeKGrams(targetString, 8)
        let targetHashGrams = hashGrams(targetGrams)
        let targetFingerPrints = getFingerprints(getJustHashes(targetHashGrams), 6)

        let shared = compareFingerprints(baseFingerPrints, targetFingerPrints)
        let targetMatches = findSharedInFile(this.diffFile, targetHashGrams, shared)
        let targetIndexes = consolidateMatches(targetMatches)
        return targetIndexes.map(pair => new Difference(pair))
    }

    // Rate the similarity of the two member SFiles with a percent
    similarity(): number {
        let baseString = sanitize(this.baseFile)
        let baseGrams = makeKGrams(baseString, 8)
        let baseHashGrams = hashGrams(baseGrams)
        let baseFingerPrints = getFingerprints(getJustHashes(baseHashGrams), 6)

        let targetString = sanitize(this.diffFile)
        let targetGrams = makeKGrams(targetString, 8)
        let targetHashGrams = hashGrams(targetGrams)
        let targetFingerPrints = getFingerprints(getJustHashes(targetHashGrams), 6)
        return similarityVal(baseFingerPrints, targetFingerPrints)
    }
}

// Sanititize the input of the given SFile and return the new input string
export function sanitize(file: SFile): string {
    let text = file.getContent()
    return text.replace(/\s+/g, '').toLowerCase()
}

// Turn a string into a list of equally sized grams
export function makeKGrams(input: string, k: number): Array<string> {
    let grams = new Array<string>()
    let len = input.length
    if(len < k) {
        grams.push(input)
        return grams
    }
    else {
        for (let i = 0; i < len - k + 1; i++) {
            grams.push(input.substring(i, i + k))
        }
        return grams
    }
}
// Turn a list of grams into a set of hashgrams with their original string representation
export function hashGrams(grams: Array<string>): Array<[number, string]> {
    let hashToStringMap = new Array<[number, string]>()
    grams.forEach(function (gram) {
        hashToStringMap.push([stringHash(gram), gram])
    })
    return hashToStringMap
}

// Helper function to just get hashvalues from the hashgrams
export function getJustHashes(tupleList: Array<[number, string]>): Array<number> {
    return tupleList.map(pair => pair[0])
}

// Function for hashing from Java
// Source: https://werxltd.com/wp/2010/05/13/javascript-implementation-of-javas-string-hashcode-method/
export function stringHash(input: string): number {
    let hash = 0
    for (let i = 0; i < input.length; i++) {
        hash = ((hash << 5) - hash) + input.charCodeAt(i)
        hash |= 0
    }
    return hash
}

// Get fingerprints given the hashgrams and return them
export function getFingerprints(hashGrams: Array<number>, windowSize: number): Map<number, number> {
    let fingerPrintMap = new Map<number, number>()
    let len = hashGrams.length
    
    // Iterate through window, selecting minimum values
    for(let i = 0; i < len - windowSize; i++) {
        let window = hashGrams.slice(i, i + windowSize)
        let minInWindow = Number.POSITIVE_INFINITY
        let indexOfMin = 0
        for(let j = 0; j < window.length; j++) {
            let curVal = window[j]
            if(curVal <= minInWindow) {
                minInWindow = curVal
                indexOfMin = j
            }
        }
        let globalPos = i + indexOfMin
        if(!fingerPrintMap.has(minInWindow) || fingerPrintMap.get(minInWindow) < globalPos) {
            fingerPrintMap.set(minInWindow, globalPos)
        }
    }
    return fingerPrintMap
}
// Compares fingerprints and returns a list of shared ones
export function compareFingerprints(base: Map<number, number>, target: Map<number, number>): Array<number> {
    let total = target.size
    let sharedCount = 0
    let shared = new Array<number>()
    for (let key of target.keys()) {
        if(base.has(key)) {
            shared.push(key)
            sharedCount++;
        }            
    }
    // console.log("Shared: " + sharedCount + ". Total: " + total)
    return shared
}
// Returns a similarity val given two sets of fingerprints
export function similarityVal(base: Map<number, number>, target: Map<number, number>): number {
    let total = target.size
    let sharedCount = 0
    let shared = new Array<number>()
    for (let key of target.keys()) {
        if(base.has(key)) {
            shared.push(key)
            sharedCount++;
        }            
    }
    // console.log("Shared: " + sharedCount + ". Total: " + total)
    return sharedCount / total
}
// Finds each instance of the shared fingerprint in the basefile, return a list of regex matches 
export function findSharedInFile(baseFile: SFile, allMapping: Array<[number, string]>, sharedFingers: Array<number>): RegExpMatchArray[] {
    let text = baseFile.getContent()
    let allMatches: RegExpMatchArray[] = []
    sharedFingers.forEach(function (fingerPrint) {
        let sharedVals = allMapping.filter(pair => pair[0] == fingerPrint)
        let gram = sharedVals[0][1]
        let chars: string[] = []
        for(let i = 0; i < gram.length; i++) {
            let toAdd = gram.substr(i, 1)
            if(toAdd == '(' || toAdd == ')' || toAdd == '[' || toAdd == ']' || toAdd == '+' || toAdd == '/' || toAdd == '*') {
                toAdd = "\\" + toAdd
            }
            chars.push(toAdd)
        }
        let regexString = chars.join('\\s*')
        let re = new RegExp(regexString)
        let matches = text.match(re)
        if(matches != null){
            allMatches.push(matches)
        }
    })
    // allMatches.forEach(match => console.log(match[0] + ":" + match.index))
    allMatches = allMatches.sort((a, b) => (a.index > b.index) ? 1 : -1)
    return allMatches
}

// Given a list of regex matches, consolidated overlapping and sequential matches into a list
// Of tuples where the first number is the starting index and second number is ending index of the matches
export function consolidateMatches(matches: RegExpMatchArray[]): Array<[number, number]> {
    let consolidatedMatches: Array<[number, number]> = []
    let startingPos = -1
    let endingPos = -1
    // Basically, loop through, continue any given sequence until the next match is out of range and then add it to the list
    for(let i = 0; i < matches.length; i++) {
        let currMatch = matches[i]
        if(startingPos == -1) {
            startingPos = currMatch.index
            if(i + 1 < matches.length) {
                if(startingPos + currMatch[0].length < matches[i + 1].index) {
                    endingPos = startingPos + currMatch[0].length
                    consolidatedMatches.push([startingPos, endingPos])
                    startingPos = -1
                    endingPos = -1
                }
            }
            else {
                endingPos = startingPos + currMatch[0].length
                consolidatedMatches.push([startingPos, endingPos])
                startingPos = -1
                endingPos = -1
            }
        }
        else {
            if(i + 1 < matches.length) {
                if(currMatch.index + currMatch[0].length < matches[i + 1].index) {
                    endingPos = currMatch.index + currMatch[0].length
                    consolidatedMatches.push([startingPos, endingPos])
                    startingPos = -1
                    endingPos = -1
                }
            }
            else {
                endingPos = currMatch.index + currMatch[0].length
                consolidatedMatches.push([startingPos, endingPos])
                startingPos = -1
                endingPos = -1
            }
        }
        
    }
    return consolidatedMatches.filter(indexPair => indexPair[1] - indexPair[0] > 0)
}