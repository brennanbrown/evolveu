def bubbleSort(dataset):

    # Examines every element in list and then decreases
    # by one each time.
    #
    # The range is going to start at
    # the length of the dataset minus one because that
    # is the zero index array's last item.
    #
    # Stops at the 0th item and then step by minus one
    # each time, doing a countdown from the array's end
    for i in range(len(dataset) - 1, 0, -1):
        # Inner-loop to compare the neighboring elements
        # and swap them, if needed.
        for j in range(i):
            # Perform the comparisons of the elements.
            if dataset[j] > dataset[j+1]:
                # Temporary variable to store aside the
                # value of dataset 'j' which will then
                # be switched to get the value of its
                # neighboring element.
                temp = dataset[j]
                dataset[j] = dataset[j+1]
                dataset[j+1] = temp



    # if item1 <= item2:
    #     return
    # else:
    #     x - 1
    # print("Current state: ", dataset)

def main():
    list1 = [5, 23, 86, 1, 3, 9, 12, 8, 34, 2]
    bubbleSort(list1)
    print("Result: ", list1)

if __name__ == "__main__":
    main()