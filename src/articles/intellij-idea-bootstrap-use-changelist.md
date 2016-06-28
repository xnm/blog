```metadata
{
  "title": "IntelliJ IDEA 技巧系列:使用自带版本控制工具的ChangeList提升Commit效率",
  "date": "2015-07-09 14:25:19",
  "tags": ["IntelliJ IDEA"]
}
```


## Background
在一群使用Eclipse的队友中特立独行使用idea有时候会遇到各种让强迫症纠结的问题。
当使用idea导入Eclipse或者其他IDE的项目的时候，idea会生成一系列的帮助idea本身配置项目的与项目无关的配置文件，比如 *.iml、*.vcs和一些xml文件。

但这些文件是第一次生成的时候，直接加进去.gitignore列表即可解决问题。
可是当遇到猪队友不懂或者误将这些文件 提交到Git一次之后，gitignore的忽略就会失效，使用桌面版Git Extension 去Commit的时候，每次都要小心翼翼不要选错文件。

可是idea本身就整合了相当方便的ChangeList：
![Change-List]()
1. 在下方工具栏位置 选中一系列需要整合到一个组的文件，右键Move to another Changelist
[![Move To Changelist]()]()
2. 可以给Changelist起一个名字叫做 IDE-Settings
[![Named Changelist]()]()
3. 当下次Commit的时候可以直接跳过该IDE-Settings中的列表，直接Commit其他全部文件
[![Commit]()]()

方便的实现 软ignore不必要commit的文件。
