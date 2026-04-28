def clean_string(data):
    replacements = str.maketrans(
        {
            "-": " ",
            "_": " ",
            ".": " ",
            ",": " ",
            "/": " "
        }
    )
    data = data.translate(replacements).split()
    return data
