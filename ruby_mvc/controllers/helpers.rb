# check if the view passed is active
def active_view?(path='')
    request.path_info == '/' + path
end